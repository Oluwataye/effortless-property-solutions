
import { corsHeaders } from "../utils/corsHeaders.ts"
import { createSupabaseClient } from "../utils/supabaseClient.ts"

// Call OpenAI API with fallback to Perplexity AI
export async function callOpenAI(message: string, systemMessage: string) {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
  const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
  
  // Try OpenAI first
  if (openAIApiKey) {
    try {
      console.log('Attempting to use OpenAI API')
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
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('OpenAI API error:', errorData)
        
        // If OpenAI fails and we have Perplexity API key, try that as fallback
        if (perplexityApiKey) {
          console.log('Falling back to Perplexity API')
          return await callPerplexity(message, systemMessage, perplexityApiKey)
        }
        
        throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`)
      }

      const data = await response.json()
      return { response: data.choices[0].message.content }
    } catch (openAIError) {
      console.error('OpenAI API error:', openAIError)
      
      // If OpenAI throws an error and we have Perplexity API key, try that as fallback
      if (perplexityApiKey) {
        console.log('Falling back to Perplexity API due to error')
        return await callPerplexity(message, systemMessage, perplexityApiKey)
      }
      
      return { 
        error: openAIError.message,
        response: "I'm sorry, but I encountered an issue while processing your request. Please try again later." 
      }
    }
  } else if (perplexityApiKey) {
    // If no OpenAI API key but we have Perplexity, use that
    console.log('No OpenAI API key, using Perplexity API')
    return await callPerplexity(message, systemMessage, perplexityApiKey)
  } else {
    // No API keys available
    console.error('No AI API keys configured')
    return {
      error: "No AI API keys are configured",
      response: "I'm sorry, but I'm currently unable to process your request due to a configuration issue. Please contact the administrator."
    }
  }
}

// Call Perplexity API as a fallback
async function callPerplexity(message: string, systemMessage: string, apiKey: string) {
  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Perplexity API error:', errorData)
      throw new Error(`Perplexity API error: ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    return { response: data.choices[0].message.content }
  } catch (perplexityError) {
    console.error('Perplexity API error:', perplexityError)
    return { 
      error: perplexityError.message,
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
