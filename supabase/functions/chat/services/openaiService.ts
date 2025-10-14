
import { corsHeaders } from "../utils/corsHeaders.ts"
import { createSupabaseClient } from "../utils/supabaseClient.ts"

// Call Lovable AI Gateway (using Gemini models)
export async function callOpenAI(message: string, systemMessage: string) {
  const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')
  
  if (!lovableApiKey) {
    console.error('LOVABLE_API_KEY not configured')
    return {
      error: "AI service not configured",
      response: "I'm sorry, but I'm currently unable to process your request. Please contact the administrator."
    }
  }

  try {
    console.log('Using Lovable AI Gateway')
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Lovable AI error:', errorData)
      
      // Handle rate limiting errors
      if (response.status === 429) {
        return {
          error: "Rate limit exceeded",
          response: "I'm currently experiencing high traffic. Please try again in a moment."
        }
      }
      
      if (response.status === 402) {
        return {
          error: "Credits exhausted",
          response: "The AI service credits have been exhausted. Please contact the administrator."
        }
      }
      
      throw new Error(`AI API error: ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    return { response: data.choices[0].message.content }
  } catch (error) {
    console.error('AI API error:', error)
    return { 
      error: error.message,
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
