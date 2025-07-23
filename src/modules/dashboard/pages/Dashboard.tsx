import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Progress } from '@/components/ui/Progress'
import { Dropdown, DropdownItem, DropdownSeparator } from '@/components/ui/Dropdown'
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Package,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap,
  Globe,
  Smartphone,
  Eye,
  RefreshCw,
  Filter,
  Download
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart
} from 'recharts'

// Données enrichies pour les graphiques
const salesData = [
  { month: 'Jan', sales: 4000, profit: 2400, orders: 45, customers: 12 },
  { month: 'Fév', sales: 3000, profit: 1398, orders: 38, customers: 18 },
  { month: 'Mar', sales: 2000, profit: 9800, orders: 52, customers: 25 },
  { month: 'Avr', sales: 2780, profit: 3908, orders: 41, customers: 19 },
  { month: 'Mai', sales: 1890, profit: 4800, orders: 35, customers: 22 },
  { month: 'Jun', sales: 2390, profit: 3800, orders: 48, customers: 31 },
  { month: 'Jul', sales: 3490, profit: 4300, orders: 55, customers: 28 }
]

const customerData = [
  { name: 'Nouveaux', value: 35, color: '#FF6B35', count: 156 },
  { name: 'Fidèles', value: 45, color: '#F7931E', count: 234 },
  { name: 'Inactifs', value: 20, color: '#8B4513', count: 89 }
]

const topProducts = [
  { name: 'Chaises de Bureau', sales: 2450, growth: 12.5, stock: 45 },
  { name: 'Ordinateurs Portables', sales: 1890, growth: -5.2, stock: 12 },
  { name: 'Imprimantes 3D', sales: 1650, growth: 25.8, stock: 8 },
  { name: 'Tablettes Graphiques', sales: 1420, growth: 8.9, stock: 23 },
  { name: 'Écrans 4K', sales: 1200, growth: 15.3, stock: 18 }
]

const recentActivities = [
  { 
    id: 1, 
    type: 'sale', 
    message: 'Nouvelle commande de Kwame Industries', 
    amount: 2450, 
    time: '2 heures', 
    status: 'success',
    avatar: 'KI'
  },
  { 
    id: 2, 
    type: 'invoice', 
    message: 'Facture INV-001 envoyée à Adaora Ltd', 
    amount: 1850, 
    time: '4 heures', 
    status: 'pending',
    avatar: 'AL'
  },
  { 
    id: 3, 
    type: 'stock', 
    message: 'Alerte stock faible: Chaises de bureau', 
    amount: null, 
    time: '6 heures', 
    status: 'warning',
    avatar: null
  },
  { 
    id: 4, 
    type: 'payment', 
    message: 'Paiement reçu de Sekou Enterprises', 
    amount: 3200, 
    time: '1 jour', 
    status: 'success',
    avatar: 'SE'
  },
  { 
    id: 5, 
    type: 'project', 
    message: 'Projet "Site E-commerce" terminé', 
    amount: null, 
    time: '2 jours', 
    status: 'success',
    avatar: null
  }
]

const upcomingTasks = [
  { id: 1, title: 'Réunion équipe ventes', time: '14:00', priority: 'high', completed: false },
  { id: 2, title: 'Révision budget Q2', time: '16:30', priority: 'medium', completed: false },
  { id: 3, title: 'Appel client - Fatima Al-Rashid', time: '10:00', priority: 'high', completed: true },
  { id: 4, title: 'Formation nouveau logiciel', time: '09:00', priority: 'low', completed: false }
]

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d')
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  const getActivityIcon = (type: string, status: string) => {
    switch (type) {
      case 'sale':
        return <DollarSign className="h-4 w-4 text-green-600" />
      case 'invoice':
        return <FileText className="h-4 w-4 text-blue-600" />
      case 'stock':
        return <Package className="h-4 w-4 text-orange-600" />
      case 'payment':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'project':
        return <Target className="h-4 w-4 text-purple-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header amélioré */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/20 rounded-full p-3">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">
                Bonjour ! Voici votre tableau de bord 👋
              </h1>
              <p className="text-muted-foreground">
                Aperçu de vos performances et activités récentes
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Aujourd'hui</div>
              <div className="text-lg font-semibold text-foreground">
                {new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long'
                })}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Dropdown
                trigger={
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    {timeRange === '7d' ? '7 jours' : timeRange === '30d' ? '30 jours' : '90 jours'}
                  </Button>
                }
              >
                <DropdownItem onClick={() => setTimeRange('7d')}>7 jours</DropdownItem>
                <DropdownItem onClick={() => setTimeRange('30d')}>30 jours</DropdownItem>
                <DropdownItem onClick={() => setTimeRange('90d')}>90 jours</DropdownItem>
              </Dropdown>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Métriques principales améliorées */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-10 -mt-10" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
            <div className="bg-green-100 p-2 rounded-lg">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€45,231</div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +20.1%
              </div>
              <span className="text-muted-foreground">vs mois dernier</span>
            </div>
            <Progress value={75} className="mt-3 h-1" variant="success" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +180
              </div>
              <span className="text-muted-foreground">nouveaux ce mois</span>
            </div>
            <Progress value={85} className="mt-3 h-1" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full -mr-10 -mt-10" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Factures en Attente</CardTitle>
            <div className="bg-orange-100 p-2 rounded-lg">
              <FileText className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex items-center text-red-600">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -2
              </div>
              <span className="text-muted-foreground">depuis hier</span>
            </div>
            <Progress value={35} className="mt-3 h-1" variant="warning" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
            <div className="bg-purple-100 p-2 rounded-lg">
              <Target className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +3.2%
              </div>
              <span className="text-muted-foreground">ce trimestre</span>
            </div>
            <Progress value={65} className="mt-3 h-1" />
          </CardContent>
        </Card>
      </div>

      {/* Graphiques améliorés */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique principal des ventes */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Évolution des Ventes & Profits</CardTitle>
              <CardDescription>Performance mensuelle des 7 derniers mois</CardDescription>
            </div>
            <Dropdown
              trigger={
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              }
            >
              <DropdownItem>
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </DropdownItem>
              <DropdownItem>
                <Eye className="mr-2 h-4 w-4" />
                Voir détails
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem>Configurer</DropdownItem>
            </Dropdown>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  fill="url(#salesGradient)"
                  stroke="#FF6B35"
                  strokeWidth={2}
                />
                <Bar yAxisId="right" dataKey="profit" fill="#F7931E" opacity={0.7} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="customers"
                  stroke="#8B4513"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF6B35" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribution des clients */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition Clientèle</CardTitle>
            <CardDescription>Segmentation par type de client</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={customerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {customerData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{item.count}</div>
                    <div className="text-xs text-muted-foreground">{item.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Produits top & Activités récentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top produits */}
        <Card>
          <CardHeader>
            <CardTitle>Produits les Plus Vendus</CardTitle>
            <CardDescription>Performance des 5 meilleurs produits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Stock: {product.stock} unités
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">€{product.sales.toLocaleString()}</div>
                    <div className={`text-xs flex items-center ${
                      product.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.growth > 0 ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(product.growth)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activités récentes améliorées */}
        <Card>
          <CardHeader>
            <CardTitle>Activités Récentes</CardTitle>
            <CardDescription>Dernières actions et événements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex-shrink-0">
                    {activity.avatar ? (
                      <Avatar size="sm" fallback={activity.avatar} />
                    ) : (
                      <div className="bg-muted rounded-full p-2">
                        {getActivityIcon(activity.type, activity.status)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.message}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        Il y a {activity.time}
                      </span>
                      {activity.amount && (
                        <>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs font-medium text-green-600">
                            €{activity.amount.toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <Badge 
                    variant={
                      activity.status === 'success' ? 'success' : 
                      activity.status === 'warning' ? 'warning' : 'info'
                    }
                    size="sm"
                  >
                    {activity.status === 'success' ? 'Terminé' : 
                     activity.status === 'warning' ? 'Attention' : 'En cours'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tâches à venir & Actions rapides */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tâches du jour */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tâches d'Aujourd'hui</CardTitle>
            <CardDescription>Votre planning et priorités</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                    task.completed ? 'opacity-60 bg-muted/50' : 'hover:shadow-sm'
                  }`}
                >
                  <button 
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      task.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-muted-foreground hover:border-primary'
                    }`}
                  >
                    {task.completed && <CheckCircle className="h-3 w-3 text-white" />}
                  </button>
                  
                  <div className="flex-1">
                    <div className={`font-medium text-sm ${task.completed ? 'line-through' : ''}`}>
                      {task.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {task.time}
                    </div>
                  </div>
                  
                  <Badge 
                    size="sm"
                    className={getPriorityColor(task.priority)}
                  >
                    {task.priority === 'high' ? 'Urgent' : 
                     task.priority === 'medium' ? 'Moyen' : 'Faible'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions rapides améliorées */}
        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
            <CardDescription>Raccourcis vers les tâches courantes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start h-12" variant="outline">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <FileText className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">Créer Facture</div>
                <div className="text-xs text-muted-foreground">Nouvelle facturation</div>
              </div>
            </Button>
            
            <Button className="w-full justify-start h-12" variant="outline">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">Ajouter Client</div>
                <div className="text-xs text-muted-foreground">Nouveau contact</div>
              </div>
            </Button>
            
            <Button className="w-full justify-start h-12" variant="outline">
              <div className="bg-orange-100 p-2 rounded-lg mr-3">
                <Package className="h-4 w-4 text-orange-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">Gérer Stock</div>
                <div className="text-xs text-muted-foreground">Inventaire</div>
              </div>
            </Button>
            
            <Button className="w-full justify-start h-12" variant="outline">
              <div className="bg-purple-100 p-2 rounded-lg mr-3">
                <Calendar className="h-4 w-4 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">Planifier RDV</div>
                <div className="text-xs text-muted-foreground">Nouveau meeting</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* IA Insights amélioré */}
      <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-primary/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full -ml-12 -mb-12" />
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-full p-2 mr-3">
              <Zap className="h-5 w-5 text-white" />
            </div>
            Insights IA - Analyse Intelligente
          </CardTitle>
          <CardDescription>Recommandations personnalisées basées sur vos données</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-card/80 backdrop-blur-sm rounded-lg border border-primary/10">
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-green-100 p-1 rounded">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <h4 className="font-semibold text-sm">Prédiction Ventes</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Basé sur les tendances actuelles, vous dépasserez votre objectif mensuel de 15%. 
                Augmentez le stock des produits phares.
              </p>
            </div>
            
            <div className="p-4 bg-card/80 backdrop-blur-sm rounded-lg border border-primary/10">
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-blue-100 p-1 rounded">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <h4 className="font-semibold text-sm">Optimisation Client</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                5 clients n'ont pas commandé depuis 60+ jours. Une campagne de ré-engagement 
                pourrait récupérer €8,500 de revenus.
              </p>
            </div>
            
            <div className="p-4 bg-card/80 backdrop-blur-sm rounded-lg border border-primary/10">
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-orange-100 p-1 rounded">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                </div>
                <h4 className="font-semibold text-sm">Alerte Trésorerie</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                €12,450 en factures impayées. Relancer les paiements en retard 
                améliorerait significativement votre flux de trésorerie.
              </p>
            </div>
            
            <div className="p-4 bg-card/80 backdrop-blur-sm rounded-lg border border-primary/10">
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-purple-100 p-1 rounded">
                  <Target className="h-4 w-4 text-purple-600" />
                </div>
                <h4 className="font-semibold text-sm">Opportunité Croissance</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Votre coût d'acquisition client a baissé de 25%. C'est le moment idéal 
                pour investir en marketing et accélérer la croissance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}