import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ShoppingCart, Plus, TrendingUp, DollarSign, Package, Users } from 'lucide-react'

export default function SalesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sales & Purchases</h1>
          <p className="text-muted-foreground">Manage sales orders, purchases, and supplier relationships</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$290</div>
            <p className="text-xs text-muted-foreground">
              +8% increase
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Verified suppliers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Message */}
      <Card>
        <CardHeader>
          <CardTitle>Sales & Purchase Management</CardTitle>
          <CardDescription>Complete sales and procurement system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Advanced Sales Features Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              Comprehensive sales and purchase management with order processing, 
              supplier management, and sales analytics will be available here.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div>✓ Sales Orders</div>
              <div>✓ Purchase Orders</div>
              <div>✓ Supplier Management</div>
              <div>✓ Price Lists</div>
              <div>✓ Order Tracking</div>
              <div>✓ Sales Reports</div>
              <div>✓ Commission Tracking</div>
              <div>✓ Procurement</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="bg-primary rounded-full p-2 mr-3">
              <ShoppingCart className="h-4 w-4 text-primary-foreground" />
            </div>
            Sales AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">🎯 Sales Opportunity</h4>
              <p className="text-sm text-muted-foreground">
                Your best-selling product category shows 25% growth potential. 
                Consider expanding inventory and marketing efforts in this segment.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">💡 Supplier Optimization</h4>
              <p className="text-sm text-muted-foreground">
                You could save 12% on procurement costs by consolidating orders 
                with your top 3 suppliers and negotiating volume discounts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}