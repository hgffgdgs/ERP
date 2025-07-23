export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url?: string
          role: 'admin' | 'hr' | 'sales' | 'manager' | 'accountant' | 'user'
          company_id?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          avatar_url?: string
          role?: 'admin' | 'hr' | 'sales' | 'manager' | 'accountant' | 'user'
          company_id?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          full_name?: string
          avatar_url?: string
          role?: 'admin' | 'hr' | 'sales' | 'manager' | 'accountant' | 'user'
          company_id?: string
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          logo_url?: string
          address?: string
          phone?: string
          email?: string
          tax_number?: string
          currency: string
          settings: Record<string, any>
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string
          address?: string
          phone?: string
          email?: string
          tax_number?: string
          currency?: string
          settings?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          logo_url?: string
          address?: string
          phone?: string
          email?: string
          tax_number?: string
          currency?: string
          settings?: Record<string, any>
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          company_id: string
          name: string
          email?: string
          phone?: string
          address?: string
          tax_number?: string
          type: 'individual' | 'company'
          status: 'active' | 'inactive'
          notes?: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          name: string
          email?: string
          phone?: string
          address?: string
          tax_number?: string
          type?: 'individual' | 'company'
          status?: 'active' | 'inactive'
          notes?: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          email?: string
          phone?: string
          address?: string
          tax_number?: string
          type?: 'individual' | 'company'
          status?: 'active' | 'inactive'
          notes?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          company_id: string
          name: string
          email?: string
          phone?: string
          company?: string
          status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
          source: string
          value?: number
          probability?: number
          expected_close_date?: string
          notes?: string
          assigned_to?: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          name: string
          email?: string
          phone?: string
          company?: string
          status?: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
          source: string
          value?: number
          probability?: number
          expected_close_date?: string
          notes?: string
          assigned_to?: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          email?: string
          phone?: string
          company?: string
          status?: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
          source?: string
          value?: number
          probability?: number
          expected_close_date?: string
          notes?: string
          assigned_to?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          company_id: string
          name: string
          description?: string
          sku: string
          barcode?: string
          category_id?: string
          unit_price: number
          cost_price: number
          tax_rate: number
          stock_quantity: number
          min_stock_level: number
          max_stock_level: number
          unit: string
          is_active: boolean
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          name: string
          description?: string
          sku: string
          barcode?: string
          category_id?: string
          unit_price: number
          cost_price: number
          tax_rate?: number
          stock_quantity?: number
          min_stock_level?: number
          max_stock_level?: number
          unit?: string
          is_active?: boolean
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string
          sku?: string
          barcode?: string
          category_id?: string
          unit_price?: number
          cost_price?: number
          tax_rate?: number
          stock_quantity?: number
          min_stock_level?: number
          max_stock_level?: number
          unit?: string
          is_active?: boolean
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          company_id: string
          customer_id: string
          invoice_number: string
          status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          issue_date: string
          due_date: string
          subtotal: number
          tax_amount: number
          total_amount: number
          paid_amount: number
          notes?: string
          terms?: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          customer_id: string
          invoice_number: string
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          issue_date: string
          due_date: string
          subtotal: number
          tax_amount: number
          total_amount: number
          paid_amount?: number
          notes?: string
          terms?: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          customer_id?: string
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          issue_date?: string
          due_date?: string
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          paid_amount?: number
          notes?: string
          terms?: string
          updated_at?: string
        }
      }
      invoice_items: {
        Row: {
          id: string
          invoice_id: string
          product_id?: string
          description: string
          quantity: number
          unit_price: number
          tax_rate: number
          total: number
          created_at: string
        }
        Insert: {
          id?: string
          invoice_id: string
          product_id?: string
          description: string
          quantity: number
          unit_price: number
          tax_rate?: number
          total: number
          created_at?: string
        }
        Update: {
          product_id?: string
          description?: string
          quantity?: number
          unit_price?: number
          tax_rate?: number
          total?: number
        }
      }
      employees: {
        Row: {
          id: string
          company_id: string
          employee_number: string
          first_name: string
          last_name: string
          email?: string
          phone?: string
          address?: string
          position: string
          department: string
          hire_date: string
          salary: number
          status: 'active' | 'inactive' | 'terminated'
          manager_id?: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          employee_number: string
          first_name: string
          last_name: string
          email?: string
          phone?: string
          address?: string
          position: string
          department: string
          hire_date: string
          salary: number
          status?: 'active' | 'inactive' | 'terminated'
          manager_id?: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          address?: string
          position?: string
          department?: string
          hire_date?: string
          salary?: number
          status?: 'active' | 'inactive' | 'terminated'
          manager_id?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          company_id: string
          name: string
          description?: string
          status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          start_date: string
          end_date?: string
          budget?: number
          spent_amount?: number
          progress: number
          manager_id: string
          customer_id?: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          name: string
          description?: string
          status?: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          start_date: string
          end_date?: string
          budget?: number
          spent_amount?: number
          progress?: number
          manager_id: string
          customer_id?: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string
          status?: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          start_date?: string
          end_date?: string
          budget?: number
          spent_amount?: number
          progress?: number
          manager_id?: string
          customer_id?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          project_id?: string
          company_id: string
          title: string
          description?: string
          status: 'todo' | 'in_progress' | 'review' | 'done'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          assigned_to?: string
          due_date?: string
          estimated_hours?: number
          actual_hours?: number
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id?: string
          company_id: string
          title: string
          description?: string
          status?: 'todo' | 'in_progress' | 'review' | 'done'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          assigned_to?: string
          due_date?: string
          estimated_hours?: number
          actual_hours?: number
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          status?: 'todo' | 'in_progress' | 'review' | 'done'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          assigned_to?: string
          due_date?: string
          estimated_hours?: number
          actual_hours?: number
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          company_id: string
          type: 'income' | 'expense'
          category: string
          amount: number
          description: string
          date: string
          account: string
          reference?: string
          invoice_id?: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          type: 'income' | 'expense'
          category: string
          amount: number
          description: string
          date: string
          account: string
          reference?: string
          invoice_id?: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          type?: 'income' | 'expense'
          category?: string
          amount?: number
          description?: string
          date?: string
          account?: string
          reference?: string
          invoice_id?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}