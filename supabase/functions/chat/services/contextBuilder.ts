
// Build system message with company context
export function buildSystemMessage(services, projects, testimonials, relevantKnowledge) {
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
  
  return systemMessage
}
