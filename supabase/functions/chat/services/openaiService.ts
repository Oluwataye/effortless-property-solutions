
import { corsHeaders } from "../utils/corsHeaders.ts"
import { createSupabaseClient } from "../utils/supabaseClient.ts"

// Call OpenAI API
export async function callOpenAI(message: string, systemMessage: string) {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
  
  if (!openAIApiKey) {
    console.error('Missing OpenAI API Key')
    return {
      error: "OPENAI_API_KEY is not configured",
      response: "I'm sorry, but I'm currently unable to process your request due to a configuration issue. Please try again later or contact the administrator."
    }
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenAI API error:', errorData)
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    return { response: data.choices[0].message.content }
  } catch (openAIError) {
    console.error('OpenAI API error:', openAIError)
    return { 
      error: openAIError.message,
      response: "I'm sorry, but I encountered an issue while processing your request. Please try again later." 
    }
  }
}

// Store message in database
export async function storeMessage(conversationId: string, content: string) {
  if (!conversationId) return
  
  const supabaseClient = createSupabaseClient()
  await supabaseClient.from('chat_messages').insert([
    { conversation_id: conversationId, content, sender_type: 'bot' }
  ])
}
