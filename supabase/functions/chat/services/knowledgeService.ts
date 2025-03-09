
import { createSupabaseClient } from "../utils/supabaseClient.ts"

// Fetch relevant knowledge from database with improved relevance scoring
export async function fetchRelevantKnowledge(message: string) {
  const supabaseClient = createSupabaseClient()
  let relevantKnowledge = []
  
  try {
    // Extract keywords from the message - simple approach to get meaningful terms
    const keywords = extractKeywords(message)
    console.log('Extracted keywords:', keywords)
    
    // Try different search strategies with decreasing specificity
    
    // 1. First try with exact text search using websearch
    const { data: textSearchData, error: textSearchError } = await supabaseClient
      .from('chatbot_knowledge')
      .select('id, question, answer, category')
      .textSearch('question', message, {
        type: 'websearch',
        config: 'english'
      })
      .limit(5)

    // 2. If exact search fails or returns no results, try with keyword-based approach
    if (textSearchError || !textSearchData || textSearchData.length === 0) {
      console.log('Exact text search failed or returned no results, trying keyword approach')
      
      let combinedResults = []
      
      // Try to match keywords in both questions and answers
      for (const keyword of keywords) {
        if (keyword.length < 3) continue // Skip very short keywords
        
        const { data: keywordData, error: keywordError } = await supabaseClient
          .from('chatbot_knowledge')
          .select('id, question, answer, category')
          .or(`question.ilike.%${keyword}%,answer.ilike.%${keyword}%`)
          .limit(10)
          
        if (!keywordError && keywordData && keywordData.length > 0) {
          combinedResults = [...combinedResults, ...keywordData]
        }
      }
      
      // 3. If we have results from keyword search, deduplicate and score them
      if (combinedResults.length > 0) {
        // Deduplicate results by ID
        const uniqueResults = Array.from(
          new Map(combinedResults.map(item => [item.id, item])).values()
        )
        
        // Score and rank results
        const scoredResults = uniqueResults.map(item => ({
          ...item,
          relevanceScore: calculateRelevanceScore(item, message, keywords)
        }))
        
        // Sort by relevance score (highest first)
        scoredResults.sort((a, b) => b.relevanceScore - a.relevanceScore)
        
        // Take top 5 results
        relevantKnowledge = scoredResults.slice(0, 5).map(({ id, relevanceScore, ...rest }) => rest)
      }
    } else {
      // If text search was successful, we already have some results
      // Score and sort them as well for consistency
      const scoredResults = textSearchData.map(item => ({
        ...item,
        relevanceScore: calculateRelevanceScore(item, message, keywords)
      }))
      
      scoredResults.sort((a, b) => b.relevanceScore - a.relevanceScore)
      relevantKnowledge = scoredResults.map(({ id, relevanceScore, ...rest }) => rest)
    }
    
    // 4. Fallback to ILIKE if we still have no results
    if (relevantKnowledge.length === 0) {
      console.log('Falling back to basic ILIKE search')
      const { data: ilikeData, error: ilikeError } = await supabaseClient
        .from('chatbot_knowledge')
        .select('question, answer, category')
        .or(`question.ilike.%${message}%,answer.ilike.%${message}%`)
        .limit(5)

      if (!ilikeError && ilikeData) {
        relevantKnowledge = ilikeData
      }
    }

    console.log('Relevant knowledge found:', relevantKnowledge.length > 0 ? 
      relevantKnowledge.length + ' entries' : 'None')
    
    if (relevantKnowledge.length > 0) {
      console.log('Sample knowledge entry:', JSON.stringify(relevantKnowledge[0]).substring(0, 100) + '...')
    }
    
    return relevantKnowledge
  } catch (knowledgeError) {
    console.error('Error fetching relevant knowledge:', knowledgeError)
    return []
  }
}

// Extract meaningful keywords from a message
function extractKeywords(message: string): string[] {
  // Convert to lowercase and remove punctuation
  const cleanedMessage = message.toLowerCase().replace(/[^\w\s]/g, '')
  
  // Split into words
  const words = cleanedMessage.split(/\s+/)
  
  // Filter out common stop words
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 
    'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'to', 'from', 'in', 'out', 'on', 'off', 'over', 'under', 'at',
    'by', 'for', 'with', 'about', 'against', 'between', 'into', 'of',
    'can', 'will', 'just', 'should', 'now', 'i', 'you', 'he', 'she', 
    'we', 'they', 'it', 'this', 'that', 'these', 'those'
  ])
  
  const keywords = words.filter(word => !stopWords.has(word) && word.length > 1)
  
  // Return unique keywords
  return Array.from(new Set(keywords))
}

// Calculate a relevance score for a knowledge entry based on the query
function calculateRelevanceScore(
  entry: { question: string; answer: string; category?: string }, 
  query: string, 
  keywords: string[]
): number {
  let score = 0
  const lowerQuery = query.toLowerCase()
  const lowerQuestion = entry.question.toLowerCase()
  const lowerAnswer = entry.answer.toLowerCase()
  
  // Direct match with question gives highest score
  if (lowerQuestion.includes(lowerQuery)) {
    score += 10
    
    // Exact match is even better
    if (lowerQuestion === lowerQuery) {
      score += 15
    }
    
    // Match at the beginning is better than in the middle
    if (lowerQuestion.startsWith(lowerQuery)) {
      score += 5
    }
  }
  
  // Match with answer also gives points
  if (lowerAnswer.includes(lowerQuery)) {
    score += 5
  }
  
  // Check each keyword for presence in question and answer
  for (const keyword of keywords) {
    if (lowerQuestion.includes(keyword)) {
      score += 3
    }
    
    if (lowerAnswer.includes(keyword)) {
      score += 1
    }
  }
  
  // Shorter questions might be more direct and relevant
  if (entry.question.length < 100) {
    score += 1
  }
  
  // Specific categories might be more relevant for certain queries
  // This would need to be customized based on your domain
  
  return score
}
