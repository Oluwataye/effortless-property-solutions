
import { createSupabaseClient } from "../utils/supabaseClient.ts"

// Fetch company services
export async function fetchCompanyServices() {
  const supabaseClient = createSupabaseClient()
  const { data, error } = await supabaseClient
    .from('services')
    .select('name, description, price')

  if (error) {
    console.error('Error fetching services:', error)
    return null
  } else {
    console.log('Services found:', data ? data.length : 0)
    return data
  }
}

// Fetch company projects
export async function fetchCompanyProjects() {
  const supabaseClient = createSupabaseClient()
  const { data, error } = await supabaseClient
    .from('projects')
    .select('name, description, location, status')

  if (error) {
    console.error('Error fetching projects:', error)
    return null
  } else {
    console.log('Projects found:', data ? data.length : 0)
    return data
  }
}

// Fetch company testimonials
export async function fetchCompanyTestimonials() {
  const supabaseClient = createSupabaseClient()
  const { data, error } = await supabaseClient
    .from('testimonials')
    .select('content, name, rating')
    .eq('status', 'approved')
    .limit(3)

  if (error) {
    console.error('Error fetching testimonials:', error)
    return null
  } else {
    console.log('Testimonials found:', data ? data.length : 0)
    return data
  }
}
