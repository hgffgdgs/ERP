export const APP_CONFIG = {
  name: 'African ERP',
  description: 'Modern ERP system for African SMEs',
  version: '1.0.0',
  author: 'African ERP Team',
} as const

export const ROUTES = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  CRM: '/crm',
  BILLING: '/billing',
  ACCOUNTING: '/accounting',
  INVENTORY: '/inventory',
  HR: '/hr',
  PROJECTS: '/projects',
  SALES: '/sales',
  SETTINGS: '/settings',
} as const

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  HR: 'hr',
  SALES: 'sales',
  ACCOUNTANT: 'accountant',
  USER: 'user',
} as const

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'EGP', symbol: '£', name: 'Egyptian Pound' },
  { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham' },
] as const

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'ar', name: 'Arabic' },
  { code: 'sw', name: 'Swahili' },
] as const

export const TIMEZONES = [
  { value: 'GMT', label: 'GMT (UTC+0)', offset: 0 },
  { value: 'WAT', label: 'WAT (UTC+1)', offset: 1 },
  { value: 'CAT', label: 'CAT (UTC+2)', offset: 2 },
  { value: 'EAT', label: 'EAT (UTC+3)', offset: 3 },
] as const

export const INVOICE_STATUSES = {
  DRAFT: 'draft',
  SENT: 'sent',
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled',
} as const

export const LEAD_STATUSES = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  PROPOSAL: 'proposal',
  NEGOTIATION: 'negotiation',
  WON: 'won',
  LOST: 'lost',
} as const

export const PROJECT_STATUSES = {
  PLANNING: 'planning',
  ACTIVE: 'active',
  ON_HOLD: 'on_hold',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export const TASK_STATUSES = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  REVIEW: 'review',
  DONE: 'done',
} as const

export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const

export const EMPLOYEE_STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  TERMINATED: 'terminated',
} as const