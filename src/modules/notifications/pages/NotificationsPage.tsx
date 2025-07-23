import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { clsx } from 'clsx'
import { 
  Bell, 
  BellRing, 
  Check, 
  X, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  DollarSign,
  Users,
  Package,
  Calendar,
  MessageSquare,
  Settings,
  Filter
} from 'lucide-react'
import { clsx } from 'clsx'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error' | 'message'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
  avatar?: string
  category: 'system' | 'billing' | 'crm' | 'inventory' | 'hr' | 'projects'
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Stock faible détecté',
    message: 'Le produit "Chaises de bureau" n\'a plus que 5 unités en stock',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
    category: 'inventory',
    avatar: undefined
  },
  {
    id: '2',
    type: 'success',
    title: 'Paiement reçu',
    message: 'Facture INV-001 de Kwame Industries payée (12 450 $)',
    timestamp: '2024-01-15T09:15:00Z',
    read: false,
    category: 'billing'
  },
  {
    id: '3',
    type: 'info',
    title: 'Nouveau prospect',
    message: 'Fatima Al-Rashid s\'est inscrite via le site web',
    timestamp: '2024-01-15T08:45:00Z',
    read: true,
    category: 'crm'
  },
  {
    id: '4',
    type: 'message',
    title: 'Demande de congé',
    message: 'John Doe a soumis une demande de congé du 20 au 25 janvier',
    timestamp: '2024-01-14T16:20:00Z',
    read: true,
    category: 'hr'
  },
  {
    id: '5',
    type: 'error',
    title: 'Échéance de projet',
    message: 'Le projet "Site Web E-commerce" dépasse la date limite',
    timestamp: '2024-01-14T14:10:00Z',
    read: false,
    category: 'projects'
  }
]

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [notificationList, setNotificationList] = useState(notifications)

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />
      case 'error':
        return <X className="h-5 w-5 text-red-600" />
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-600" />
      default:
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getCategoryIcon = (category: Notification['category']) => {
    switch (category) {
      case 'billing':
        return <DollarSign className="h-4 w-4" />
      case 'crm':
        return <Users className="h-4 w-4" />
      case 'inventory':
        return <Package className="h-4 w-4" />
      case 'hr':
        return <Users className="h-4 w-4" />
      case 'projects':
        return <Calendar className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  const getBadgeVariant = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'success'
      case 'warning':
        return 'warning'
      case 'error':
        return 'error'
      default:
        return 'info'
    }
  }

  const markAsRead = (id: string) => {
    setNotificationList(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotificationList(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotificationList(prev => prev.filter(notif => notif.id !== id))
  }

  const filteredNotifications = notificationList.filter(notif => {
    const statusFilter = filter === 'all' || 
      (filter === 'read' && notif.read) || 
      (filter === 'unread' && !notif.read)
    
    const catFilter = categoryFilter === 'all' || notif.category === categoryFilter
    
    return statusFilter && catFilter
  })

  const unreadCount = notificationList.filter(n => !n.read).length

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'À l\'instant'
    if (diffInHours < 24) return `Il y a ${diffInHours}h`
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bell className="h-8 w-8 text-primary" />
            {unreadCount > 0 && (
              <Badge 
                variant="error" 
                size="sm" 
                className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center text-xs"
              >
                {unreadCount}
              </Badge>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 
                ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}`
                : 'Toutes les notifications sont lues'
              }
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Tout marquer comme lu
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtres:</span>
            </div>
            
            <div className="flex space-x-2">
              {['all', 'unread', 'read'].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter(f as any)}
                >
                  {f === 'all' ? 'Toutes' : f === 'unread' ? 'Non lues' : 'Lues'}
                </Button>
              ))}
            </div>

            <div className="flex space-x-2">
              {['all', 'system', 'billing', 'crm', 'inventory', 'hr', 'projects'].map((cat) => (
                <Button
                  key={cat}
                  variant={categoryFilter === cat ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setCategoryFilter(cat)}
                  className="flex items-center space-x-1"
                >
                  {cat !== 'all' && getCategoryIcon(cat as any)}
                  <span className="capitalize">
                    {cat === 'all' ? 'Toutes' : 
                     cat === 'billing' ? 'Facturation' :
                     cat === 'crm' ? 'CRM' :
                     cat === 'inventory' ? 'Stock' :
                     cat === 'hr' ? 'RH' :
                     cat === 'projects' ? 'Projets' : cat}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Aucune notification
              </h3>
              <p className="text-muted-foreground">
                {filter === 'unread' 
                  ? 'Toutes vos notifications sont lues'
                  : 'Vous n\'avez aucune notification pour le moment'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={clsx(
                'transition-all duration-200 hover:shadow-md cursor-pointer',
                !notification.read && 'border-l-4 border-l-primary bg-primary/5'
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between space-x-4">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-foreground truncate">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <span>{formatTime(notification.timestamp)}</span>
                        <div className="flex items-center space-x-1">
                          {getCategoryIcon(notification.category)}
                          <span className="capitalize">
                            {notification.category === 'billing' ? 'Facturation' :
                             notification.category === 'crm' ? 'CRM' :
                             notification.category === 'inventory' ? 'Stock' :
                             notification.category === 'hr' ? 'RH' :
                             notification.category === 'projects' ? 'Projets' : 
                             notification.category}
                          </span>
                        </div>
                        <Badge variant={getBadgeVariant(notification.type)} size="sm">
                          {notification.type === 'success' ? 'Succès' :
                           notification.type === 'warning' ? 'Attention' :
                           notification.type === 'error' ? 'Erreur' :
                           notification.type === 'message' ? 'Message' : 'Info'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          markAsRead(notification.id)
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNotification(notification.id)
                      }}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="bg-primary rounded-full p-2 mr-3">
              <BellRing className="h-4 w-4 text-primary-foreground" />
            </div>
            Insights IA sur les Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">📊 Analyse des Tendances</h4>
              <p className="text-sm text-muted-foreground">
                Vous recevez 40% plus de notifications liées au stock cette semaine. 
                Considérez l'optimisation de vos niveaux de réapprovisionnement.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">🎯 Recommandation</h4>
              <p className="text-sm text-muted-foreground">
                Activez les notifications push pour les factures en retard. 
                Cela pourrait améliorer votre taux de recouvrement de 25%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}