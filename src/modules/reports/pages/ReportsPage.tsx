import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  Users,
  Package,
  BarChart3,
  PieChart,
  Activity,
  Filter,
  RefreshCw,
  Eye,
  Share2,
  Clock
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

interface Report {
  id: string
  name: string
  type: 'financial' | 'sales' | 'inventory' | 'hr' | 'customer'
  description: string
  lastGenerated: string
  status: 'ready' | 'generating' | 'scheduled'
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  format: 'pdf' | 'excel' | 'csv'
  size: string
}

const reports: Report[] = [
  {
    id: '1',
    name: 'Rapport Financier Mensuel',
    type: 'financial',
    description: 'Analyse complète des revenus, dépenses et rentabilité',
    lastGenerated: '2024-01-15T09:00:00Z',
    status: 'ready',
    frequency: 'monthly',
    format: 'pdf',
    size: '2.4 MB'
  },
  {
    id: '2',
    name: 'Performance des Ventes',
    type: 'sales',
    description: 'Évolution des ventes par produit et région',
    lastGenerated: '2024-01-15T08:30:00Z',
    status: 'ready',
    frequency: 'weekly',
    format: 'excel',
    size: '1.8 MB'
  },
  {
    id: '3',
    name: 'État des Stocks',
    type: 'inventory',
    description: 'Niveaux de stock, mouvements et alertes',
    lastGenerated: '2024-01-14T18:00:00Z',
    status: 'generating',
    frequency: 'daily',
    format: 'pdf',
    size: '856 KB'
  },
  {
    id: '4',
    name: 'Analyse Clientèle',
    type: 'customer',
    description: 'Segmentation et comportement des clients',
    lastGenerated: '2024-01-12T14:20:00Z',
    status: 'ready',
    frequency: 'monthly',
    format: 'pdf',
    size: '3.2 MB'
  },
  {
    id: '5',
    name: 'Rapport RH Trimestriel',
    type: 'hr',
    description: 'Performance, absences et indicateurs RH',
    lastGenerated: '2024-01-01T10:00:00Z',
    status: 'scheduled',
    frequency: 'quarterly',
    format: 'excel',
    size: '1.2 MB'
  }
]

// Données pour les graphiques
const salesData = [
  { month: 'Jan', ventes: 45000, objectif: 50000, croissance: 12 },
  { month: 'Fév', ventes: 52000, objectif: 55000, croissance: 15 },
  { month: 'Mar', ventes: 48000, objectif: 52000, croissance: 8 },
  { month: 'Avr', ventes: 61000, objectif: 58000, croissance: 22 },
  { month: 'Mai', ventes: 55000, objectif: 60000, croissance: 18 },
  { month: 'Jun', ventes: 67000, objectif: 65000, croissance: 25 }
]

const categoryData = [
  { name: 'Mobilier', value: 35, color: '#FF6B35' },
  { name: 'Électronique', value: 28, color: '#F7931E' },
  { name: 'Fournitures', value: 22, color: '#8B4513' },
  { name: 'Services', value: 15, color: '#228B22' }
]

export default function ReportsPage() {
  const [filter, setFilter] = useState<'all' | 'financial' | 'sales' | 'inventory' | 'hr' | 'customer'>('all')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')

  const getTypeIcon = (type: Report['type']) => {
    switch (type) {
      case 'financial':
        return <DollarSign className="h-5 w-5" />
      case 'sales':
        return <TrendingUp className="h-5 w-5" />
      case 'inventory':
        return <Package className="h-5 w-5" />
      case 'hr':
        return <Users className="h-5 w-5" />
      case 'customer':
        return <Users className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getStatusBadge = (status: Report['status']) => {
    switch (status) {
      case 'ready':
        return <Badge variant="success">Prêt</Badge>
      case 'generating':
        return <Badge variant="warning">En cours</Badge>
      case 'scheduled':
        return <Badge variant="info">Programmé</Badge>
    }
  }

  const getTypeColor = (type: Report['type']) => {
    switch (type) {
      case 'financial':
        return 'text-green-600 bg-green-100'
      case 'sales':
        return 'text-blue-600 bg-blue-100'
      case 'inventory':
        return 'text-orange-600 bg-orange-100'
      case 'hr':
        return 'text-purple-600 bg-purple-100'
      case 'customer':
        return 'text-pink-600 bg-pink-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter(report => report.type === filter)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rapports & Analytics</h1>
          <p className="text-muted-foreground">Générez et consultez vos rapports d'activité</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Nouveau Rapport
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rapports Générés</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">
              +12 ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automatisés</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Rapports programmés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temps Économisé</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45h</div>
            <p className="text-xs text-muted-foreground">
              Ce mois-ci
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taille Totale</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128 MB</div>
            <p className="text-xs text-muted-foreground">
              Stockage utilisé
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance des Ventes</CardTitle>
            <CardDescription>Évolution mensuelle vs objectifs</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`${value}€`, name === 'ventes' ? 'Ventes' : 'Objectif']} />
                <Area
                  type="monotone"
                  dataKey="ventes"
                  stackId="1"
                  stroke="#FF6B35"
                  fill="#FF6B35"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="objectif"
                  stackId="2"
                  stroke="#F7931E"
                  fill="#F7931E"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Catégorie</CardTitle>
            <CardDescription>Distribution des ventes par secteur</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Part']} />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtrer par type:</span>
            </div>
            
            <div className="flex space-x-2">
              {['all', 'financial', 'sales', 'inventory', 'hr', 'customer'].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter(f as any)}
                  className="flex items-center space-x-1"
                >
                  {f !== 'all' && getTypeIcon(f as any)}
                  <span>
                    {f === 'all' ? 'Tous' : 
                     f === 'financial' ? 'Financier' :
                     f === 'sales' ? 'Ventes' :
                     f === 'inventory' ? 'Stock' :
                     f === 'hr' ? 'RH' : 'Clients'}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg ${getTypeColor(report.type)}`}>
                  {getTypeIcon(report.type)}
                </div>
                {getStatusBadge(report.status)}
              </div>
              <CardTitle className="text-lg">{report.name}</CardTitle>
              <CardDescription className="text-sm">
                {report.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Fréquence:</span>
                  <span className="capitalize">{report.frequency === 'daily' ? 'Quotidien' : 
                    report.frequency === 'weekly' ? 'Hebdomadaire' :
                    report.frequency === 'monthly' ? 'Mensuel' : 'Trimestriel'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span className="uppercase">{report.format}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taille:</span>
                  <span>{report.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dernière génération:</span>
                  <span>{formatDate(report.lastGenerated)}</span>
                </div>
              </div>

              {report.status === 'generating' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  disabled={report.status !== 'ready'}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Voir
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  disabled={report.status !== 'ready'}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="bg-primary rounded-full p-2 mr-3">
              <BarChart3 className="h-4 w-4 text-primary-foreground" />
            </div>
            Insights Automatiques IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">📊 Tendance Détectée</h4>
              <p className="text-sm text-muted-foreground">
                Vos ventes de mobilier augmentent de 35% ce trimestre. 
                Considérez l'expansion de cette gamme de produits.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">⚡ Optimisation</h4>
              <p className="text-sm text-muted-foreground">
                Automatisez 3 rapports supplémentaires pour économiser 
                15h de travail manuel par mois.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">🎯 Recommandation</h4>
              <p className="text-sm text-muted-foreground">
                Créez un tableau de bord en temps réel pour surveiller 
                les KPI critiques de votre activité.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}