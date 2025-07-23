import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/auth/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Dropdown, DropdownItem, DropdownSeparator } from '@/components/ui/Dropdown'
import { AIAssistant } from '@/components/ai/AIAssistant'
import {
  Building2,
  Users,
  FileText,
  Calculator,
  Package,
  UserCheck,
  FolderOpen,
  ShoppingCart,
  Settings,
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
  BarChart3,
  Bell,
  Search,
  ChevronDown,
  Zap,
  Activity
} from 'lucide-react'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  badge?: string
  color?: string
}

const navigation: NavigationItem[] = [
  { 
    name: 'Tableau de Bord', 
    href: '/dashboard', 
    icon: BarChart3, 
    description: 'Vue d\'ensemble & Analytics',
    color: 'text-blue-600 bg-blue-100'
  },
  { 
    name: 'CRM', 
    href: '/crm', 
    icon: Users, 
    description: 'Gestion Clientèle',
    badge: '12',
    color: 'text-green-600 bg-green-100'
  },
  { 
    name: 'Facturation', 
    href: '/billing', 
    icon: FileText, 
    description: 'Factures & Paiements',
    badge: '3',
    color: 'text-orange-600 bg-orange-100'
  },
  { 
    name: 'Comptabilité', 
    href: '/accounting', 
    icon: Calculator, 
    description: 'Finances & Comptes',
    color: 'text-purple-600 bg-purple-100'
  },
  { 
    name: 'Stock', 
    href: '/inventory', 
    icon: Package, 
    description: 'Gestion Inventaire',
    badge: '7',
    color: 'text-red-600 bg-red-100'
  },
  { 
    name: 'RH', 
    href: '/hr', 
    icon: UserCheck, 
    description: 'Ressources Humaines',
    color: 'text-indigo-600 bg-indigo-100'
  },
  { 
    name: 'Projets', 
    href: '/projects', 
    icon: FolderOpen, 
    description: 'Suivi de Projets',
    color: 'text-cyan-600 bg-cyan-100'
  },
  { 
    name: 'Ventes', 
    href: '/sales', 
    icon: ShoppingCart, 
    description: 'Ventes & Achats',
    color: 'text-emerald-600 bg-emerald-100'
  },
  { 
    name: 'Rapports', 
    href: '/reports', 
    icon: Activity, 
    description: 'Rapports & Analytics',
    color: 'text-pink-600 bg-pink-100'
  },
  { 
    name: 'Notifications', 
    href: '/notifications', 
    icon: Bell, 
    description: 'Centre de Notifications',
    badge: '5',
    color: 'text-yellow-600 bg-yellow-100'
  },
  { 
    name: 'Paramètres', 
    href: '/settings', 
    icon: Settings, 
    description: 'Configuration Système',
    color: 'text-gray-600 bg-gray-100'
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const { user, profile, signOut } = useAuth()
  const location = useLocation()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const currentPage = navigation.find(item => location.pathname.startsWith(item.href))

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar amélioré */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-card/95 backdrop-blur-sm border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo amélioré */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-2 mr-3">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">African ERP</span>
                <div className="text-xs text-muted-foreground">Business Suite</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Barre de recherche */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Navigation améliorée */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname.startsWith(item.href)
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className={`p-2 rounded-lg mr-3 transition-colors ${
                    isActive 
                      ? 'bg-white/20' 
                      : item.color || 'bg-muted group-hover:bg-primary/10'
                  }`}>
                    <Icon className={`h-4 w-4 ${
                      isActive 
                        ? 'text-primary-foreground' 
                        : 'text-current group-hover:text-primary'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{item.name}</span>
                      {item.badge && (
                        <Badge 
                          variant={isActive ? "secondary" : "default"} 
                          size="sm"
                          className="ml-2"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <div className={`text-xs truncate mt-0.5 ${
                      isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Profil utilisateur amélioré */}
          <div className="p-4 border-t border-border bg-muted/20">
            <Dropdown
              trigger={
                <div className="flex items-center p-3 rounded-xl hover:bg-accent/50 cursor-pointer transition-colors">
                  <Avatar 
                    size="md" 
                    fallback={profile?.full_name || user?.email || 'U'} 
                    className="mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {profile?.full_name || user?.email}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {profile?.role || 'Utilisateur'}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              }
              align="right"
            >
              <DropdownItem>
                <UserCheck className="mr-2 h-4 w-4" />
                Mon Profil
              </DropdownItem>
              <DropdownItem>
                <Settings className="mr-2 h-4 w-4" />
                Préférences
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem onClick={toggleDarkMode}>
                {darkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                {darkMode ? 'Mode Clair' : 'Mode Sombre'}
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Main content amélioré */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar amélioré */}
        <header className="h-16 bg-card/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-3">
              {currentPage && (
                <div className={`p-2 rounded-lg ${currentPage.color || 'bg-muted'}`}>
                  <currentPage.icon className="h-5 w-5" />
                </div>
              )}
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  {currentPage?.name || 'Tableau de Bord'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {currentPage?.description || 'Bienvenue dans votre espace de travail'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Dropdown
              trigger={
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge 
                    variant="error" 
                    size="sm" 
                    className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center text-xs"
                  >
                    5
                  </Badge>
                </Button>
              }
              align="right"
            >
              <DropdownItem>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-1 rounded">
                    <FileText className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Facture payée</div>
                    <div className="text-xs text-muted-foreground">Il y a 2h</div>
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem>
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-1 rounded">
                    <Package className="h-3 w-3 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Stock faible</div>
                    <div className="text-xs text-muted-foreground">Il y a 4h</div>
                  </div>
                </div>
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem>
                <Bell className="mr-2 h-4 w-4" />
                Voir toutes les notifications
              </DropdownItem>
            </Dropdown>

            {/* Profil rapide */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">
                  {profile?.full_name || 'Utilisateur'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date().toLocaleDateString('fr-FR', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short'
                  })}
                </p>
              </div>
              <Avatar 
                size="sm" 
                fallback={profile?.full_name || user?.email || 'U'} 
              />
            </div>
          </div>
        </header>

        {/* Page content amélioré */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container mx-auto px-6 py-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  )
}