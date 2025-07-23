import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/auth/AuthProvider'
import { useAuth } from '@/auth/hooks/useAuth'
import AuthPage from '@/auth/pages/AuthPage'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Dashboard from '@/modules/dashboard/pages/Dashboard'
import CRMPage from '@/modules/crm/pages/CRMPage'
import BillingPage from '@/modules/billing/pages/BillingPage'
import AccountingPage from '@/modules/accounting/pages/AccountingPage'
import InventoryPage from '@/modules/inventory/pages/InventoryPage'
import HRPage from '@/modules/hr/pages/HRPage'
import ProjectsPage from '@/modules/projects/pages/ProjectsPage'
import SalesPage from '@/modules/sales/pages/SalesPage'
import SettingsPage from '@/modules/settings/pages/SettingsPage'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Routes>
      <Route 
        path="/auth" 
        element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
      />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/crm/*" element={<CRMPage />} />
                <Route path="/billing/*" element={<BillingPage />} />
                <Route path="/accounting/*" element={<AccountingPage />} />
                <Route path="/inventory/*" element={<InventoryPage />} />
                <Route path="/hr/*" element={<HRPage />} />
                <Route path="/projects/*" element={<ProjectsPage />} />
                <Route path="/sales/*" element={<SalesPage />} />
                <Route path="/settings/*" element={<SettingsPage />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <AppRoutes />
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
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App