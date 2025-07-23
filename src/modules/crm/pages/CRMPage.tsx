import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MapPin,
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react'

// Sample data
const customers = [
  {
    id: 1,
    name: 'Kwame Industries Ltd',
    email: 'contact@kwameindustries.com',
    phone: '+233 20 123 4567',
    location: 'Accra, Ghana',
    status: 'Active',
    totalOrders: 15,
    totalValue: 45000,
    lastOrder: '2024-01-15'
  },
  {
    id: 2,
    name: 'Adaora Enterprises',
    email: 'info@adaoraent.com',
    phone: '+234 80 987 6543',
    location: 'Lagos, Nigeria',
    status: 'Active',
    totalOrders: 8,
    totalValue: 28500,
    lastOrder: '2024-01-12'
  },
  {
    id: 3,
    name: 'Sekou Trading Co.',
    email: 'sekou@trading.co',
    phone: '+221 77 555 0123',
    location: 'Dakar, Senegal',
    status: 'Inactive',
    totalOrders: 3,
    totalValue: 12000,
    lastOrder: '2023-12-01'
  }
]

const leads = [
  {
    id: 1,
    name: 'Fatima Al-Rashid',
    company: 'Desert Rose Trading',
    email: 'fatima@desertrosetrading.com',
    status: 'Hot',
    value: 25000,
    source: 'Website',
    lastContact: '2024-01-14'
  },
  {
    id: 2,
    name: 'Joseph Mbeki',
    company: 'Ubuntu Solutions',
    email: 'j.mbeki@ubuntu-solutions.co.za',
    status: 'Warm',
    value: 15000,
    source: 'Referral',
    lastContact: '2024-01-10'
  }
]

export default function CRMPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('customers')

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      case 'hot':
        return 'bg-red-100 text-red-800'
      case 'warm':
        return 'bg-orange-100 text-orange-800'
      case 'cold':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customer Relationship Management</h1>
          <p className="text-muted-foreground">Manage your customers, leads, and sales pipeline</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              5 hot prospects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125,500</div>
            <p className="text-xs text-muted-foreground">
              Expected this quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follow-ups</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Due this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('customers')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'customers'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            Customers
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'leads'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            Leads
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pipeline'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            Sales Pipeline
          </button>
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers, leads, or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'customers' && (
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>Manage your customer relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{customer.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {customer.email}
                        </span>
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {customer.phone}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {customer.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">${customer.totalValue.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{customer.totalOrders} orders</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'leads' && (
        <Card>
          <CardHeader>
            <CardTitle>Leads</CardTitle>
            <CardDescription>Track and convert your prospects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-secondary/10 rounded-full p-3">
                      <TrendingUp className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{lead.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{lead.company}</span>
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {lead.email}
                        </span>
                        <span>Source: {lead.source}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">${lead.value.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Potential value</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                    <Button variant="outline" size="sm">
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'pipeline' && (
        <Card>
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>Visual overview of your sales process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Sales Pipeline Coming Soon</h3>
              <p className="text-muted-foreground">
                Interactive Kanban-style pipeline with drag-and-drop functionality will be available here.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="bg-primary rounded-full p-2 mr-3">
              <Users className="h-4 w-4 text-primary-foreground" />
            </div>
            CRM AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">🎯 High-Value Opportunity</h4>
              <p className="text-sm text-muted-foreground">
                Fatima Al-Rashid from Desert Rose Trading shows strong buying signals. 
                Schedule a follow-up call within 2 days to maximize conversion chances.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">⚠️ At-Risk Customer</h4>
              <p className="text-sm text-muted-foreground">
                Sekou Trading Co. hasn't placed an order in 45 days. Consider reaching out 
                with a special offer or checking if they need assistance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}