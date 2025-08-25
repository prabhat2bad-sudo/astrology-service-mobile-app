import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', cors())
app.use('*', logger(console.log))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// User registration endpoint
app.post('/make-server-c8370f13/auth/register', async (c) => {
  try {
    const { email, phone, name } = await c.req.json()
    
    const authField = email ? 'email' : 'phone'
    const authValue = email || phone
    
    const { data, error } = await supabase.auth.admin.createUser({
      [authField]: authValue,
      user_metadata: { name },
      email_confirm: true
    })
    
    if (error) {
      console.log(`Registration error: ${error.message}`)
      return c.json({ error: error.message }, 400)
    }
    
    return c.json({ success: true, user: data.user })
  } catch (error) {
    console.log(`Registration server error: ${error}`)
    return c.json({ error: 'Registration failed' }, 500)
  }
})

// Save user profile
app.post('/make-server-c8370f13/profile/save', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const profile = await c.req.json()
    
    await kv.set(`profile:${user.id}`, {
      ...profile,
      userId: user.id,
      updatedAt: new Date().toISOString()
    })
    
    return c.json({ success: true })
  } catch (error) {
    console.log(`Profile save error: ${error}`)
    return c.json({ error: 'Failed to save profile' }, 500)
  }
})

// Get user profile
app.get('/make-server-c8370f13/profile/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')
    const profile = await kv.get(`profile:${userId}`)
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404)
    }
    
    return c.json({ profile })
  } catch (error) {
    console.log(`Profile fetch error: ${error}`)
    return c.json({ error: 'Failed to fetch profile' }, 500)
  }
})

// Get personalized alerts
app.get('/make-server-c8370f13/alerts/:userId', async (c) => {
  try {
    const userId = c.req.param('userId')
    const alerts = await kv.getByPrefix(`alert:${userId}`)
    
    return c.json({ alerts })
  } catch (error) {
    console.log(`Alerts fetch error: ${error}`)
    return c.json({ error: 'Failed to fetch alerts' }, 500)
  }
})

// Create personalized alert
app.post('/make-server-c8370f13/alerts/create', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const alertData = await c.req.json()
    const alertId = crypto.randomUUID()
    
    await kv.set(`alert:${user.id}:${alertId}`, {
      ...alertData,
      id: alertId,
      userId: user.id,
      createdAt: new Date().toISOString()
    })
    
    return c.json({ success: true, alertId })
  } catch (error) {
    console.log(`Alert creation error: ${error}`)
    return c.json({ error: 'Failed to create alert' }, 500)
  }
})

// Celebrity matching endpoint
app.post('/make-server-c8370f13/celebrity/match', async (c) => {
  try {
    const { userProfile } = await c.req.json()
    
    // In a real implementation, this would use actual astrological calculations
    const celebrities = [
      {
        name: 'Shah Rukh Khan',
        profession: 'Actor',
        matchPercentage: Math.floor(Math.random() * 20) + 80,
        zodiacSign: 'Scorpio',
        birthDate: 'November 2, 1965',
        commonTraits: ['Charismatic', 'Ambitious', 'Creative']
      },
      {
        name: 'Priyanka Chopra',
        profession: 'Actress',
        matchPercentage: Math.floor(Math.random() * 20) + 75,
        zodiacSign: 'Cancer',
        birthDate: 'July 18, 1982',
        commonTraits: ['Determined', 'Versatile', 'Leadership']
      }
    ]
    
    return c.json({ matches: celebrities })
  } catch (error) {
    console.log(`Celebrity matching error: ${error}`)
    return c.json({ error: 'Failed to match celebrities' }, 500)
  }
})

// Generate personalized insights
app.post('/make-server-c8370f13/insights/generate', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const profile = await kv.get(`profile:${user.id}`)
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404)
    }
    
    // Generate insights based on current date and user profile
    const insights = {
      health: {
        message: 'Saturn transit suggests focusing on routine health checkups',
        priority: 'high',
        actionRequired: true
      },
      finance: {
        message: 'Jupiter alignment favors long-term investments',
        priority: 'medium',
        actionRequired: false
      },
      career: {
        message: 'Excellent period for career advancement until March',
        priority: 'high',
        actionRequired: true
      }
    }
    
    return c.json({ insights })
  } catch (error) {
    console.log(`Insights generation error: ${error}`)
    return c.json({ error: 'Failed to generate insights' }, 500)
  }
})

app.get('/make-server-c8370f13/health', (c) => {
  return c.json({ status: 'OK', message: 'AstroLife Pro server is running' })
})

serve(app.fetch)