import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Minimize2,
  Maximize2,
  Sparkles,
  TrendingUp,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Zap,
  BarChart3,
  Target,
  Clock,
  Bot
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  suggestions?: string[]
  actions?: Array<{
    label: string
    icon: React.ComponentType<{ className?: string }>
    action: () => void
  }>
}

interface QuickAction {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  category: string
}

const quickActions: QuickAction[] = [
  {
    id: '1',
    label: 'Analyser Ventes',
    icon: TrendingUp,
    description: 'Analyse des performances de vente',
    category: 'Analytics'
  },
  {
    id: '2',
    label: 'Rapport Clients',
    icon: Users,
    description: 'Génération rapport clientèle',
    category: 'CRM'
  },
  {
    id: '3',
    label: 'Prédiction Budget',
    icon: DollarSign,
    description: 'Prévisions budgétaires IA',
    category: 'Finance'
  },
  {
    id: '4',
    label: 'Optimiser Stock',
    icon: Target,
    description: 'Recommandations inventaire',
    category: 'Inventory'
  }
]

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '👋 Bonjour ! Je suis votre assistant IA pour African ERP. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date(),
      suggestions: [
        'Analyser les ventes du mois',
        'Créer un rapport client',
        'Optimiser mon stock',
        'Prédire les revenus'
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simuler une réponse IA
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const generateAIResponse = (userInput: string): Message => {
    const responses = [
      {
        content: '📊 J\'ai analysé vos données de vente. Vos revenus ont augmenté de 23% ce mois-ci ! Voici mes recommandations :',
        suggestions: ['Augmenter le stock des produits populaires', 'Lancer une campagne marketing', 'Analyser la satisfaction client'],
        actions: [
          { label: 'Voir rapport détaillé', icon: BarChart3, action: () => console.log('Rapport détaillé') },
          { label: 'Créer campagne', icon: Target, action: () => console.log('Créer campagne') }
        ]
      },
      {
        content: '💡 Basé sur vos patterns de vente, je recommande de réapprovisionner 3 produits cette semaine. Voulez-vous que je génère les commandes ?',
        suggestions: ['Générer les commandes', 'Voir les détails stock', 'Planifier livraisons'],
        actions: [
          { label: 'Générer commandes', icon: CheckCircle, action: () => console.log('Générer commandes') }
        ]
      },
      {
        content: '🎯 J\'ai identifié 5 clients inactifs avec un potentiel de €12,500. Une campagne de réactivation pourrait récupérer 60% de ce montant.',
        suggestions: ['Créer campagne réactivation', 'Voir profils clients', 'Analyser causes inactivité'],
        actions: [
          { label: 'Créer campagne', icon: Users, action: () => console.log('Créer campagne') },
          { label: 'Voir analyses', icon: TrendingUp, action: () => console.log('Voir analyses') }
        ]
      },
      {
        content: '⚠️ Alerte : 3 factures importantes arrivent à échéance dans 48h (total: €8,750). Je peux préparer les relances automatiquement.',
        suggestions: ['Préparer relances', 'Voir détails factures', 'Planifier appels clients'],
        actions: [
          { label: 'Préparer relances', icon: AlertTriangle, action: () => console.log('Préparer relances') }
        ]
      }
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    return {
      id: Date.now().toString(),
      type: 'ai',
      content: randomResponse.content,
      timestamp: new Date(),
      suggestions: randomResponse.suggestions,
      actions: randomResponse.actions
    }
  }

  const handleQuickAction = (action: QuickAction) => {
    const message = `Exécuter: ${action.label} - ${action.description}`
    setInputValue(message)
    handleSendMessage()
  }

  const toggleListening = () => {
    setIsListening(!isListening)
    // Ici vous pourriez intégrer la reconnaissance vocale
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000) // Simuler l'arrêt après 3s
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all duration-300 group"
        >
          <div className="relative">
            <Sparkles className="h-6 w-6 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
        </Button>
        
        {/* Notification badge */}
        <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce">
          3
        </div>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar size="sm" className="bg-gradient-to-r from-primary to-secondary">
                  <Bot className="h-4 w-4 text-white" />
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground flex items-center">
                  Assistant IA
                  <Sparkles className="h-4 w-4 ml-1 text-primary" />
                </h3>
                <p className="text-xs text-muted-foreground">
                  {isTyping ? 'En train d\'écrire...' : 'En ligne'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 h-96 overflow-y-auto bg-gradient-to-b from-background/50 to-muted/20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    {message.type === 'ai' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar size="xs" className="bg-gradient-to-r from-primary to-secondary">
                          <Bot className="h-3 w-3 text-white" />
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          Assistant IA • {formatTime(message.timestamp)}
                        </span>
                      </div>
                    )}
                    
                    <div
                      className={`p-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground ml-4'
                          : 'bg-card border border-border shadow-sm'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      
                      {message.type === 'user' && (
                        <div className="text-xs opacity-70 mt-1 text-right">
                          {formatTime(message.timestamp)}
                        </div>
                      )}
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        <div className="text-xs text-muted-foreground font-medium">
                          Suggestions:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-7 rounded-full"
                              onClick={() => {
                                setInputValue(suggestion)
                                inputRef.current?.focus()
                              }}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    {message.actions && (
                      <div className="mt-3 space-y-2">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="secondary"
                            size="sm"
                            className="w-full justify-start h-8"
                            onClick={action.action}
                          >
                            <action.icon className="h-3 w-3 mr-2" />
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar size="xs" className="bg-gradient-to-r from-primary to-secondary">
                      <Bot className="h-3 w-3 text-white" />
                    </Avatar>
                    <div className="bg-card border border-border rounded-2xl p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-t border-border bg-muted/20">
              <div className="text-xs font-medium text-muted-foreground mb-2">Actions rapides:</div>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.id}
                    variant="ghost"
                    size="sm"
                    className="h-auto p-2 flex flex-col items-start text-left"
                    onClick={() => handleQuickAction(action)}
                  >
                    <div className="flex items-center w-full mb-1">
                      <action.icon className="h-3 w-3 mr-2 text-primary" />
                      <span className="text-xs font-medium truncate">{action.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {action.description}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-end space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Posez votre question à l'IA..."
                    className="w-full px-4 py-2 pr-12 bg-muted/50 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleListening}
                    className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 rounded-full ${
                      isListening ? 'bg-red-100 text-red-600' : 'hover:bg-accent'
                    }`}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="h-10 w-10 p-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {isListening && (
                <div className="mt-2 flex items-center justify-center">
                  <div className="flex items-center space-x-2 text-red-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                    <span className="text-xs">Écoute en cours...</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {isMinimized && (
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar size="sm" className="bg-gradient-to-r from-primary to-secondary">
                <Bot className="h-4 w-4 text-white" />
              </Avatar>
              <div>
                <span className="font-medium text-sm">Assistant IA</span>
                <Badge variant="success" size="sm" className="ml-2">3 insights</Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}