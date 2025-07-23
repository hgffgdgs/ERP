export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  role: 'admin' | 'hr' | 'sales' | 'manager' | 'accountant' | 'user'
  company_id?: string
  created_at: string
  updated_at: string
}

export interface Company {
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

export interface Customer {
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

export interface Lead {
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

export interface Product {
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

export interface Invoice {
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

export interface InvoiceItem {
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

export interface Employee {
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

export interface Project {
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

export interface Task {
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

export interface Transaction {
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