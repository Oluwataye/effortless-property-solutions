
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { corsHeaders } from "./utils/corsHeaders.ts"
import { fetchRelevantKnowledge } from "./services/knowledgeService.ts"
import { fetchCompanyServices, fetchCompanyProjects, fetchCompanyTestimonials } from "./services/companyDataService.ts"
import { buildSystemMessage } from "./services/contextBuilder.ts"
import { callOpenAI, storeMessage } from "./services/openaiService.ts"

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, conversationId } = await req.json()

    // Get relevant knowledge from the database
    const relevantKnowledge = await fetchRelevantKnowledge(message)
    
    // Get company data
    const services = await fetchCompanyServices()
    const projects = await fetchCompanyProjects()
    const testimonials = await fetchCompanyTestimonials()
    
    // Build system message with company context
    const systemMessage = buildSystemMessage(services, projects, testimonials, relevantKnowledge)
    
    // Call OpenAI API
    const result = await callOpenAI(message, systemMessage)
    
    // Store message in database if there's a conversation ID
    if (conversationId && result.response) {
      await storeMessage(conversationId, result.response)
    }

    return new Response(
      JSON.stringify({ response: result.response, error: result.error }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        response: "I'm sorry, but I encountered an unexpected error. Please try again later." 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
