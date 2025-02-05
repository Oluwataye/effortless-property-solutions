import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, conversationId } = await req.json()
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured')
    }

    // Get relevant knowledge from the database
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Search for relevant knowledge
    const { data: relevantKnowledge } = await supabaseClient
      .from('chatbot_knowledge')
      .select('question, answer')
      .textSearch('question', message)
      .limit(3)

    // Construct system message with relevant knowledge
    let systemMessage = "You are a helpful real estate assistant. "
    if (relevantKnowledge?.length > 0) {
      systemMessage += "Here is some relevant information: \n"
      relevantKnowledge.forEach(({ question, answer }) => {
        systemMessage += `Q: ${question}\nA: ${answer}\n\n`
      })
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: message }
        ],
      }),
    })

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    // Store the message in the database
    if (conversationId) {
      await supabaseClient.from('chat_messages').insert([
        { conversation_id: conversationId, content: message, sender_type: 'user' },
        { conversation_id: conversationId, content: aiResponse, sender_type: 'bot' }
      ])
    }

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})