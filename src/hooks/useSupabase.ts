import { useState, useCallback } from 'react'
import { supabase, handleSupabaseError } from '@/lib/supabase'
import { Database } from '@/types/database'
import toast from 'react-hot-toast'

type Tables = Database['public']['Tables']

export function useSupabase<T extends keyof Tables>(tableName: T) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const insert = useCallback(async (data: Tables[T]['Insert']) => {
    setLoading(true)
    setError(null)
    
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert(data)
        .select()
        .single()

      if (error) {
        const errorMessage = handleSupabaseError(error)
        setError(errorMessage)
        toast.error(errorMessage)
        return { data: null, error }
      }

      toast.success('Record created successfully')
      return { data: result, error: null }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }, [tableName])

  const update = useCallback(async (id: string, data: Tables[T]['Update']) => {
    setLoading(true)
    setError(null)
    
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        const errorMessage = handleSupabaseError(error)
        setError(errorMessage)
        toast.error(errorMessage)
        return { data: null, error }
      }

      toast.success('Record updated successfully')
      return { data: result, error: null }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }, [tableName])

  const remove = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id)

      if (error) {
        const errorMessage = handleSupabaseError(error)
        setError(errorMessage)
        toast.error(errorMessage)
        return { error }
      }

      toast.success('Record deleted successfully')
      return { error: null }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
      return { error: err }
    } finally {
      setLoading(false)
    }
  }, [tableName])

  const fetch = useCallback(async (filters?: Record<string, any>) => {
    setLoading(true)
    setError(null)
    
    try {
      let query = supabase.from(tableName).select('*')
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
      }

      const { data, error } = await query

      if (error) {
        const errorMessage = handleSupabaseError(error)
        setError(errorMessage)
        return { data: null, error }
      }

      return { data, error: null }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred'
      setError(errorMessage)
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }, [tableName])

  return {
    loading,
    error,
    insert,
    update,
    remove,
    fetch,
  }
}