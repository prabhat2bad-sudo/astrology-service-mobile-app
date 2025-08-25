import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from './supabase/info'

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
)

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-c8370f13`

export interface UserProfile {
  name: string
  dateOfBirth: string
  timeOfBirth: string
  placeOfBirth: string
}

export interface Alert {
  id: string
  category: 'health' | 'travel' | 'finance' | 'property' | 'relationship' | 'child' | 'career'
  title: string
  message: string
  priority: 'high' | 'medium' | 'low'
  actionRequired: boolean
  createdAt: string
}

export const api = {
  // Authentication
  async signUp(email: string, name: string) {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email, name })
      })
      
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data
    } catch (error) {
      console.error('Sign up error:', error)
      throw error
    }
  },

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  },

  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error
      return data.session
    } catch (error) {
      console.error('Get session error:', error)
      throw error
    }
  },

  // Profile management
  async saveProfile(profile: UserProfile, accessToken?: string) {
    try {
      const session = accessToken || (await this.getSession())?.access_token
      
      const response = await fetch(`${API_BASE}/profile/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session || publicAnonKey}`
        },
        body: JSON.stringify(profile)
      })
      
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data
    } catch (error) {
      console.error('Save profile error:', error)
      throw error
    }
  },

  async getProfile(userId: string) {
    try {
      const response = await fetch(`${API_BASE}/profile/${userId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      })
      
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data.profile
    } catch (error) {
      console.error('Get profile error:', error)
      throw error
    }
  },

  // Alerts
  async getAlerts(userId: string) {
    try {
      const response = await fetch(`${API_BASE}/alerts/${userId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      })
      
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data.alerts
    } catch (error) {
      console.error('Get alerts error:', error)
      throw error
    }
  },

  async createAlert(alert: Partial<Alert>) {
    try {
      const session = await this.getSession()
      
      const response = await fetch(`${API_BASE}/alerts/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || publicAnonKey}`
        },
        body: JSON.stringify(alert)
      })
      
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data
    } catch (error) {
      console.error('Create alert error:', error)
      throw error
    }
  },

  // Celebrity matching
  async getCelebrityMatches(userProfile: UserProfile) {
    try {
      const response = await fetch(`${API_BASE}/celebrity/match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ userProfile })
      })
      
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data.matches
    } catch (error) {
      console.error('Celebrity match error:', error)
      throw error
    }
  },

  // Insights
  async generateInsights() {
    try {
      const session = await this.getSession()
      
      const response = await fetch(`${API_BASE}/insights/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || publicAnonKey}`
        }
      })
      
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data.insights
    } catch (error) {
      console.error('Generate insights error:', error)
      throw error
    }
  }
}