
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.2.0"

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
      console.error('Missing OpenAI API Key')
      return new Response(
        JSON.stringify({ 
          error: "OPENAI_API_KEY is not configured",
          response: "I'm sorry, but I'm currently unable to process your request due to a configuration issue. Please try again later or contact the administrator."
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get relevant knowledge from the database
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabaseClient = createClient(supabaseUrl, supabaseKey)

    // Search for relevant knowledge about the query using a more robust approach
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
    } catch (knowledgeError) {
      console.error('Error fetching relevant knowledge with fallback approach:', knowledgeError)
    }

    // Get company services
    const { data: services, error: servicesError } = await supabaseClient
      .from('services')
      .select('name, description, price')

    if (servicesError) {
      console.error('Error fetching services:', servicesError)
    } else {
      console.log('Services found:', services ? services.length : 0)
    }

    // Get company projects
    const { data: projects, error: projectsError } = await supabaseClient
      .from('projects')
      .select('name, description, location, status')

    if (projectsError) {
      console.error('Error fetching projects:', projectsError)
    } else {
      console.log('Projects found:', projects ? projects.length : 0)
    }

    // Get testimonials for company reputation
    const { data: testimonials, error: testimonialsError } = await supabaseClient
      .from('testimonials')
      .select('content, name, rating')
      .eq('status', 'approved')
      .limit(3)

    if (testimonialsError) {
      console.error('Error fetching testimonials:', testimonialsError)
    } else {
      console.log('Testimonials found:', testimonials ? testimonials.length : 0)
    }

    // Construct comprehensive system message with company context
    let systemMessage = "You are a professional, helpful customer support assistant for a real estate company. "
    systemMessage += "Be polite, informative, and concise in your responses. "
    systemMessage += "Include specific information from the company context in your responses when relevant. "
    
    // Add services information
    if (services && services.length > 0) {
      systemMessage += "\n\nCOMPANY SERVICES:\n"
      services.forEach(service => {
        systemMessage += `- ${service.name}: ${service.description}`
        if (service.price) {
          systemMessage += ` (Price: $${service.price})`
        }
        systemMessage += "\n"
      })
    }
    
    // Add projects information
    if (projects && projects.length > 0) {
      systemMessage += "\n\nCOMPANY PROJECTS:\n"
      projects.forEach(project => {
        systemMessage += `- ${project.name}: ${project.description}`
        if (project.location) {
          systemMessage += ` (Location: ${project.location})`
        }
        if (project.status) {
          systemMessage += ` (Status: ${project.status})`
        }
        systemMessage += "\n"
      })
    }
    
    // Add testimonials for credibility
    if (testimonials && testimonials.length > 0) {
      systemMessage += "\n\nCUSTOMER TESTIMONIALS:\n"
      testimonials.forEach(testimonial => {
        systemMessage += `- "${testimonial.content}" - ${testimonial.name}`
        if (testimonial.rating) {
          systemMessage += ` (Rating: ${testimonial.rating}/5)`
        }
        systemMessage += "\n"
      })
    }
    
    // Add specific knowledge from the knowledge base if relevant
    if (relevantKnowledge && relevantKnowledge.length > 0) {
      systemMessage += "\n\nRELEVANT COMPANY KNOWLEDGE:\n"
      relevantKnowledge.forEach(({ question, answer }) => {
        systemMessage += `Q: ${question}\nA: ${answer}\n\n`
      })
    }

    console.log('System message length:', systemMessage.length)
    console.log('System message preview:', systemMessage.substring(0, 200) + '...')

    try {
      // Call OpenAI API with enhanced context
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
        const errorData = await response.json();
        console.error('OpenAI API error:', errorData);
        throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

      // Store the message in the database
      if (conversationId) {
        await supabaseClient.from('chat_messages').insert([
          { conversation_id: conversationId, content: aiResponse, sender_type: 'bot' }
        ])
      }

      return new Response(
        JSON.stringify({ response: aiResponse }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (openAIError) {
      console.error('OpenAI API error:', openAIError)
      return new Response(
        JSON.stringify({ 
          error: openAIError.message,
          response: "I'm sorry, but I encountered an issue while processing your request. Please try again later." 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
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
