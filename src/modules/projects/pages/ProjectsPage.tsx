import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Progress } from '@/components/ui/Progress'
import { Dropdown, DropdownItem, DropdownSeparator } from '@/components/ui/Dropdown'
import {
  FolderOpen,
  Plus,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  MoreVertical,
  Play,
  Pause,
  Target,
  TrendingUp,
  Filter,
  Search,
  Grid3X3,
  List,
  Kanban,
  Edit,
  Trash2,
  Eye,
  Star,
  MessageSquare,
  Paperclip,
  Timer
} from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  progress: number
  startDate: string
  endDate: string
  budget: number
  spent: number
  team: Array<{
    id: string
    name: string
    avatar?: string
    role: string
  }>
  tasks: {
    total: number
    completed: number
    inProgress: number
    pending: number
  }
  client: string
  category: string
}

interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'review' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee: string
  dueDate: string
  project: string
  tags: string[]
  timeSpent: number
  estimatedTime: number
}

const projects: Project[] = [
  {
    id: '1',
    name: 'Site E-commerce Mobile',
    description: 'Développement d\'une application mobile pour le commerce électronique avec intégration paiement mobile',
    status: 'active',
    priority: 'high',
    progress: 75,
    startDate: '2024-01-01',
    endDate: '2024-03-15',
    budget: 45000,
    spent: 32000,
    client: 'Kwame Industries',
    category: 'Développement',
    team: [
      { id: '1', name: 'Adaora Okafor', role: 'Lead Developer', avatar: 'AO' },
      { id: '2', name: 'Sekou Diallo', role: 'UI/UX Designer', avatar: 'SD' },
      { id: '3', name: 'Fatima Al-Rashid', role: 'QA Engineer', avatar: 'FR' }
    ],
    tasks: { total: 24, completed: 18, inProgress: 4, pending: 2 }
  },
  {
    id: '2',
    name: 'Système de Gestion Scolaire',
    description: 'Plateforme complète de gestion pour établissements scolaires avec modules élèves, professeurs et parents',
    status: 'active',
    priority: 'medium',
    progress: 45,
    startDate: '2024-01-15',
    endDate: '2024-05-30',
    budget: 75000,
    spent: 28000,
    client: 'École Internationale Dakar',
    category: 'Éducation',
    team: [
      { id: '4', name: 'Amara Keita', role: 'Project Manager', avatar: 'AK' },
      { id: '5', name: 'Yusuf Hassan', role: 'Backend Developer', avatar: 'YH' }
    ],
    tasks: { total: 32, completed: 12, inProgress: 8, pending: 12 }
  },
  {
    id: '3',
    name: 'App Fintech Microfinance',
    description: 'Application mobile pour services de microfinance et transferts d\'argent en Afrique de l\'Ouest',
    status: 'planning',
    priority: 'urgent',
    progress: 15,
    startDate: '2024-02-01',
    endDate: '2024-07-15',
    budget: 120000,
    spent: 8000,
    client: 'FinanceAfric Ltd',
    category: 'Fintech',
    team: [
      { id: '6', name: 'Khadija Mbeki', role: 'Product Owner', avatar: 'KM' },
      { id: '7', name: 'Omar Benali', role: 'Security Expert', avatar: 'OB' }
    ],
    tasks: { total: 45, completed: 3, inProgress: 5, pending: 37 }
  },
  {
    id: '4',
    name: 'Plateforme Agritech',
    description: 'Solution IoT pour l\'agriculture intelligente avec monitoring des cultures et prédictions météo',
    status: 'completed',
    priority: 'medium',
    progress: 100,
    startDate: '2023-10-01',
    endDate: '2024-01-10',
    budget: 85000,
    spent: 82000,
    client: 'AgroTech Solutions',
    category: 'Agriculture',
    team: [
      { id: '8', name: 'Chinwe Okonkwo', role: 'IoT Specialist', avatar: 'CO' },
      { id: '9', name: 'Mamadou Sy', role: 'Data Scientist', avatar: 'MS' }
    ],
    tasks: { total: 28, completed: 28, inProgress: 0, pending: 0 }
  }
]

const recentTasks: Task[] = [
  {
    id: '1',
    title: 'Intégration API Paiement Mobile Money',
    description: 'Intégrer les APIs Orange Money et MTN Mobile Money',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Adaora Okafor',
    dueDate: '2024-01-20',
    project: 'Site E-commerce Mobile',
    tags: ['API', 'Paiement', 'Mobile'],
    timeSpent: 12,
    estimatedTime: 16
  },
  {
    id: '2',
    title: 'Design Interface Tableau de Bord',
    description: 'Créer les maquettes pour le dashboard administrateur',
    status: 'review',
    priority: 'medium',
    assignee: 'Sekou Diallo',
    dueDate: '2024-01-18',
    project: 'Système de Gestion Scolaire',
    tags: ['Design', 'UI/UX', 'Dashboard'],
    timeSpent: 8,
    estimatedTime: 10
  },
  {
    id: '3',
    title: 'Tests de Sécurité',
    description: 'Audit de sécurité complet de l\'application',
    status: 'todo',
    priority: 'urgent',
    assignee: 'Omar Benali',
    dueDate: '2024-01-25',
    project: 'App Fintech Microfinance',
    tags: ['Sécurité', 'Tests', 'Audit'],
    timeSpent: 0,
    estimatedTime: 24
  }
]

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'kanban'>('grid')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'planning':
        return 'text-blue-600 bg-blue-100'
      case 'on-hold':
        return 'text-orange-600 bg-orange-100'
      case 'completed':
        return 'text-purple-600 bg-purple-100'
      case 'cancelled':
        return 'text-red-600 bg-red-100'
    }
  }

  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-100'
      case 'high':
        return 'text-orange-600 bg-orange-100'
      case 'medium':
        return 'text-blue-600 bg-blue-100'
      case 'low':
        return 'text-green-600 bg-green-100'
    }
  }

  const getTaskStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'in-progress':
        return 'text-blue-600 bg-blue-100'
      case 'review':
        return 'text-orange-600 bg-orange-100'
      case 'todo':
        return 'text-gray-600 bg-gray-100'
    }
  }

  const filteredProjects = projects.filter(project => {
    const statusMatch = statusFilter === 'all' || project.status === statusFilter
    const priorityMatch = priorityFilter === 'all' || project.priority === priorityFilter
    return statusMatch && priorityMatch
  })

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif'
      case 'planning': return 'Planification'
      case 'on-hold': return 'En pause'
      case 'completed': return 'Terminé'
      case 'cancelled': return 'Annulé'
      default: return status
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'Urgent'
      case 'high': return 'Élevée'
      case 'medium': return 'Moyenne'
      case 'low': return 'Faible'
      default: return priority
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/20 rounded-full p-3">
              <FolderOpen className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">
                Gestion de Projets 🚀
              </h1>
              <p className="text-muted-foreground">
                Suivez vos projets, équipes et livrables en temps réel
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Projet
            </Button>
          </div>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projets Actifs</CardTitle>
            <div className="bg-blue-100 p-2 rounded-lg">
              <Play className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.filter(p => p.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              En cours d'exécution
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-10 -mt-10" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tâches Complétées</CardTitle>
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.reduce((acc, p) => acc + p.tasks.completed, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Cette semaine
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full -mr-10 -mt-10" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Total</CardTitle>
            <div className="bg-orange-100 p-2 rounded-lg">
              <Target className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €{projects.reduce((acc, p) => acc + p.budget, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Tous projets confondus
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Équipe Active</CardTitle>
            <div className="bg-purple-100 p-2 rounded-lg">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(projects.flatMap(p => p.team.map(t => t.id))).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Membres d'équipe
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et vue */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filtres:</span>
              </div>
              
              <div className="flex space-x-2">
                <Dropdown
                  trigger={
                    <Button variant="outline" size="sm">
                      Statut: {getStatusLabel(statusFilter)}
                    </Button>
                  }
                >
                  <DropdownItem onClick={() => setStatusFilter('all')}>Tous</DropdownItem>
                  <DropdownItem onClick={() => setStatusFilter('active')}>Actif</DropdownItem>
                  <DropdownItem onClick={() => setStatusFilter('planning')}>Planification</DropdownItem>
                  <DropdownItem onClick={() => setStatusFilter('completed')}>Terminé</DropdownItem>
                  <DropdownItem onClick={() => setStatusFilter('on-hold')}>En pause</DropdownItem>
                </Dropdown>

                <Dropdown
                  trigger={
                    <Button variant="outline" size="sm">
                      Priorité: {getPriorityLabel(priorityFilter)}
                    </Button>
                  }
                >
                  <DropdownItem onClick={() => setPriorityFilter('all')}>Toutes</DropdownItem>
                  <DropdownItem onClick={() => setPriorityFilter('urgent')}>Urgent</DropdownItem>
                  <DropdownItem onClick={() => setPriorityFilter('high')}>Élevée</DropdownItem>
                  <DropdownItem onClick={() => setPriorityFilter('medium')}>Moyenne</DropdownItem>
                  <DropdownItem onClick={() => setPriorityFilter('low')}>Faible</DropdownItem>
                </Dropdown>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex space-x-1 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('kanban')}
                  className="h-8 w-8 p-0"
                >
                  <Kanban className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projets Grid */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(project.priority)} size="sm">
                      {getPriorityLabel(project.priority)}
                    </Badge>
                    <Badge className={getStatusColor(project.status)} size="sm">
                      {getStatusLabel(project.status)}
                    </Badge>
                  </div>
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    }
                  >
                    <DropdownItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Voir détails
                    </DropdownItem>
                    <DropdownItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownItem>
                    <DropdownSeparator />
                    <DropdownItem>
                      <Star className="mr-2 h-4 w-4" />
                      Favoris
                    </DropdownItem>
                  </Dropdown>
                </div>
                
                <CardTitle className="text-lg line-clamp-2">{project.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress 
                    value={project.progress} 
                    variant={project.progress >= 75 ? 'success' : project.progress >= 50 ? 'default' : 'warning'}
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Budget</div>
                    <div className="font-medium">€{project.budget.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Dépensé</div>
                    <div className="font-medium">€{project.spent.toLocaleString()}</div>
                  </div>
                </div>

                {/* Tasks */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tâches</span>
                  <div className="flex space-x-2">
                    <Badge variant="success" size="sm">{project.tasks.completed}</Badge>
                    <Badge variant="info" size="sm">{project.tasks.inProgress}</Badge>
                    <Badge variant="secondary" size="sm">{project.tasks.pending}</Badge>
                  </div>
                </div>

                {/* Team */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Équipe</span>
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member) => (
                      <Avatar
                        key={member.id}
                        size="sm"
                        fallback={member.avatar || member.name}
                        className="border-2 border-background"
                      />
                    ))}
                    {project.team.length > 3 && (
                      <div className="w-8 h-8 bg-muted rounded-full border-2 border-background flex items-center justify-center text-xs font-medium">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                {/* Client & Category */}
                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Client: {project.client}</span>
                    <span>{project.category}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tâches récentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Timer className="mr-2 h-5 w-5" />
            Tâches Récentes
          </CardTitle>
          <CardDescription>Activité récente sur vos projets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                <div className="flex-shrink-0">
                  <Badge className={getTaskStatusColor(task.status)} size="sm">
                    {task.status === 'completed' ? 'Terminé' :
                     task.status === 'in-progress' ? 'En cours' :
                     task.status === 'review' ? 'Révision' : 'À faire'}
                  </Badge>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <Badge className={getPriorityColor(task.priority)} size="sm">
                      {getPriorityLabel(task.priority)}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {task.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span>👤 {task.assignee}</span>
                      <span>📁 {task.project}</span>
                      <span>📅 {new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>{task.timeSpent}h / {task.estimatedTime}h</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {task.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="bg-primary rounded-full p-2 mr-3">
              <TrendingUp className="h-4 w-4 text-primary-foreground" />
            </div>
            Insights IA - Gestion de Projets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">⚡ Optimisation Ressources</h4>
              <p className="text-sm text-muted-foreground">
                Réaffectez Sekou Diallo du projet École vers Fintech pour respecter 
                la deadline critique du 25 janvier.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">📊 Prédiction Retard</h4>
              <p className="text-sm text-muted-foreground">
                Le projet E-commerce risque 12 jours de retard. Augmentez l'équipe 
                ou réduisez le scope pour livrer à temps.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">💰 Alerte Budget</h4>
              <p className="text-sm text-muted-foreground">
                Le projet Agritech a dépassé 96% du budget. Négociez un avenant 
                ou optimisez les coûts restants.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}