
import { createSupabaseClient } from "../utils/supabaseClient.ts"

// Fetch relevant knowledge from database
export async function fetchRelevantKnowledge(message: string) {
  const supabaseClient = createSupabaseClient()
  let relevantKnowledge = []
  
  try {
    // First try with text search
    const { data: textSearchData, error: textSearchError } = await supabaseClient
      .from('chatbot_knowledge')
      .select('question, answer')
      .textSearch('question', message, {
        type: 'websearch',
        config: 'english'
      })
      .limit(5)

    if (textSearchError) {
      console.error('Error with text search:', textSearchError)
      // Fallback to ILIKE search if text search fails
      const { data: ilikeData, error: ilikeError } = await supabaseClient
        .from('chatbot_knowledge')
        .select('question, answer')
        .or(`question.ilike.%${message}%,answer.ilike.%${message}%`)
        .limit(5)

      if (!ilikeError && ilikeData) {
        relevantKnowledge = ilikeData
      }
    } else if (textSearchData && textSearchData.length > 0) {
      relevantKnowledge = textSearchData
    } else {
      // If text search returns no results, try with ILIKE
      const { data: ilikeData, error: ilikeError } = await supabaseClient
        .from('chatbot_knowledge')
        .select('question, answer')
        .or(`question.ilike.%${message}%,answer.ilike.%${message}%`)
        .limit(5)

      if (!ilikeError && ilikeData) {
        relevantKnowledge = ilikeData
      }
    }

    console.log('Relevant knowledge found:', relevantKnowledge.length > 0 ? relevantKnowledge : 'None')
    return relevantKnowledge
  } catch (knowledgeError) {
    console.error('Error fetching relevant knowledge with fallback approach:', knowledgeError)
    return []
  }
}
