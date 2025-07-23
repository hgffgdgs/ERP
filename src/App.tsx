import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/auth/AuthProvider'
import { ProtectedRoute } from '@/auth/ProtectedRoute'
import DashboardLayout from '@/components/layout/DashboardLayout'

// Auth pages
import LoginPage from '@/auth/pages/LoginPage'
import SignupPage from '@/auth/pages/SignupPage'

// App pages
import Dashboard from '@/modules/dashboard/pages/Dashboard'
import CRMPage from '@/modules/crm/pages/CRMPage'
import BillingPage from '@/modules/billing/pages/BillingPage'
import AccountingPage from '@/modules/accounting/pages/AccountingPage'
import InventoryPage from '@/modules/inventory/pages/InventoryPage'
import HRPage from '@/modules/hr/pages/HRPage'
import ProjectsPage from '@/modules/projects/pages/ProjectsPage'
import SalesPage from '@/modules/sales/pages/SalesPage'
import NotificationsPage from '@/modules/notifications/pages/NotificationsPage'
import ReportsPage from '@/modules/reports/pages/ReportsPage'
import SettingsPage from '@/modules/settings/pages/SettingsPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Protected routes */}
              <Route path="/" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
              <Route path="/crm" element={<ProtectedRoute><DashboardLayout><CRMPage /></DashboardLayout></ProtectedRoute>} />
              <Route path="/billing" element={<ProtectedRoute><DashboardLayout><BillingPage /></DashboardLayout></ProtectedRoute>} />
              <Route path="/accounting" element={<ProtectedRoute><DashboardLayout><AccountingPage /></DashboardLayout></ProtectedRoute>} />
              <Route path="/inventory" element={<ProtectedRoute><DashboardLayout><InventoryPage /></DashboardLayout></ProtectedRoute>} />
              <Route path="/hr" element={<ProtectedRoute><DashboardLayout><HRPage /></DashboardLayout></ProtectedRoute>} />
              <Route path="/projects" element={<ProtectedRoute><DashboardLayout><ProjectsPage /></DashboardLayout></ProtectedRoute>} />
              <Route path="/sales" element={<ProtectedRoute><DashboardLayout><SalesPage /></DashboardLayout></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><DashboardLayout><NotificationsPage /></DashboardLayout></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><DashboardLayout><ReportsPage /></DashboardLayout></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><DashboardLayout><SettingsPage /></DashboardLayout></ProtectedRoute>} />
              
              {/* Catch all */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--card))',
                color: 'hsl(var(--card-foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App