
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { corsHeaders } from "./utils/corsHeaders.ts"
import { fetchRelevantKnowledge } from "./services/knowledgeService.ts"
import { fetchCompanyServices, fetchCompanyProjects, fetchCompanyTestimonials } from "./services/companyDataService.ts"
import { buildSystemMessage } from "./services/contextBuilder.ts"
import { callOpenAI, storeMessage } from "./services/openaiService.ts"
import { checkRateLimit } from "./utils/rateLimit.ts"

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, conversationId } = await req.json()
    
    // Input validation - prevent injection attacks
    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: "Invalid message format" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Length validation - prevent DoS through large payloads
    if (message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Message too long. Maximum 5000 characters allowed." }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Rate limiting - prevent DDoS attacks (10 requests per minute per conversation)
    const rateLimitKey = conversationId || req.headers.get('x-forwarded-for') || 'anonymous';
    if (!checkRateLimit(rateLimitKey, 10, 60000)) {
      return new Response(
        JSON.stringify({ 
          error: "Rate limit exceeded. Please wait a moment before sending another message.",
          response: "I'm receiving too many requests. Please wait a moment and try again."
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // For service-related queries, let's add special handling to ensure they work
    const isServiceQuery = message.toLowerCase().includes('service') || 
                          message.toLowerCase().includes('offer') ||
                          message.toLowerCase().includes('provide')
    
    // Get relevant knowledge from the database
    const relevantKnowledge = await fetchRelevantKnowledge(message)
    
    // Get company data
    const services = await fetchCompanyServices()
    const projects = await fetchCompanyProjects()
    const testimonials = await fetchCompanyTestimonials()
    
    // Build system message with company context
    let systemMessage = buildSystemMessage(services, projects, testimonials, relevantKnowledge)
    
    // For service-related queries, add extra context to ensure they're answered properly
    if (isServiceQuery && services) {
      systemMessage += "\n\nIMPORTANT: If asked about services, prioritize providing an informative response about the company's services. "
      systemMessage += "Here are the available services again in a clear format:\n"
      
      if (services && services.length > 0) {
        services.forEach((service, index) => {
          systemMessage += `Service ${index + 1}: ${service.name} - ${service.description}`
          if (service.price) {
            systemMessage += ` (Price: $${service.price})`
          }
          systemMessage += "\n"
        })
      } else {
        // Backup service information in case database lookup failed
        systemMessage += "- Facility Management: Comprehensive facility management solutions for property efficiency.\n"
        systemMessage += "- Real Estate Management: Professional property management services.\n"
        systemMessage += "- Property Buying: Expert guidance throughout property acquisition.\n"
        systemMessage += "- Property Development: End-to-end property development services.\n"
        systemMessage += "- Property Selling: Strategic property marketing and sales services.\n"
      }
    }
    
    // Call AI API (OpenAI with fallback to Perplexity)
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        response: "I'm sorry, but I encountered an unexpected error. Please try again later." 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
