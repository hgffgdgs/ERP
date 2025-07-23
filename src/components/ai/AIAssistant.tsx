import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { 
  Bot, 
  MessageCircle, 
  X, 
  Send, 
  Lightbulb, 
  TrendingUp, 
  FileText,
  Users
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const quickActions = [
  { icon: TrendingUp, label: 'Sales Summary', action: 'show-sales-summary' },
  { icon: FileText, label: 'Recent Invoices', action: 'show-recent-invoices' },
  { icon: Users, label: 'Customer Insights', action: 'show-customer-insights' },
  { icon: Lightbulb, label: 'Business Tips', action: 'show-business-tips' },
]

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI business assistant. I can help you with sales insights, generate reports, answer questions about your business, and provide recommendations. How can I assist you today?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(content),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('sales') || input.includes('revenue')) {
      return '📈 Based on your current data, your sales are trending upward this month with a 15% increase compared to last month. Your top-performing products are driving most of the growth. Would you like me to generate a detailed sales report?'
    }
    
    if (input.includes('invoice') || input.includes('billing')) {
      return '💰 You have 3 pending invoices totaling $12,450. 2 invoices are due within the next 7 days. I can help you send payment reminders or generate new invoices. What would you like to do?'
    }
    
    if (input.includes('customer') || input.includes('client')) {
      return '👥 You have 47 active customers with an average order value of $850. Your customer retention rate is 85%. I notice 5 customers haven\'t placed orders in the last 60 days - would you like me to suggest a re-engagement campaign?'
    }
    
    if (input.includes('inventory') || input.includes('stock')) {
      return '📦 Your inventory status: 12 products are running low on stock, 3 products are out of stock. Based on sales trends, I recommend restocking your top 5 products within the next 2 weeks to avoid stockouts.'
    }
    
    if (input.includes('report') || input.includes('analytics')) {
      return '📊 I can generate various reports for you: Sales Performance, Customer Analysis, Inventory Status, Financial Summary, or Project Progress. Which report would you like me to create?'
    }
    
    if (input.includes('help') || input.includes('how')) {
      return '🤝 I can help you with: \n• Analyzing business performance\n• Generating reports and insights\n• Managing customers and leads\n• Tracking inventory and sales\n• Providing business recommendations\n\nWhat specific area would you like assistance with?'
    }
    
    return '🤖 I understand you\'re asking about your business operations. While I\'m still learning about your specific needs, I can help you with sales analysis, customer management, inventory tracking, and generating business insights. Could you be more specific about what you\'d like to know?'
  }

  const handleQuickAction = (action: string) => {
    let message = ''
    switch (action) {
      case 'show-sales-summary':
        message = 'Show me a sales summary for this month'
        break
      case 'show-recent-invoices':
        message = 'What are my recent invoices?'
        break
      case 'show-customer-insights':
        message = 'Give me customer insights'
        break
      case 'show-business-tips':
        message = 'Give me some business tips'
        break
    }
    handleSendMessage(message)
  }

  return (
    <>
      {/* AI Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full shadow-lg hover:scale-105 transition-transform"
            size="lg"
          >
            <Bot className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* AI Assistant Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] flex flex-col">
          <Card className="flex-1 flex flex-col shadow-2xl">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-primary rounded-full p-2">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">AI Assistant</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col space-y-4 p-4">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-lg text-sm ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground p-3 rounded-lg text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Quick actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => {
                      const Icon = action.icon
                      return (
                        <Button
                          key={action.action}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAction(action.action)}
                          className="justify-start text-xs h-8"
                        >
                          <Icon className="h-3 w-3 mr-1" />
                          {action.label}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about your business..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage(inputValue)
                    }
                  }}
                  disabled={isLoading}
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}