import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Package, Plus, AlertTriangle, TrendingDown, BarChart3 } from 'lucide-react'

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Track stock levels, manage products, and optimize inventory</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Active products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Need restocking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Urgent restocking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$85,450</div>
            <p className="text-xs text-muted-foreground">
              Inventory value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Message */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Management System</CardTitle>
          <CardDescription>Complete stock and product management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Advanced Inventory Features Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              Comprehensive inventory management with real-time tracking, automated reordering, 
              and intelligent stock optimization will be available here.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div>✓ Product Catalog</div>
              <div>✓ Stock Tracking</div>
              <div>✓ Barcode Scanning</div>
              <div>✓ Automated Reordering</div>
              <div>✓ Supplier Management</div>
              <div>✓ Stock Movements</div>
              <div>✓ Inventory Reports</div>
              <div>✓ Multi-location Support</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="bg-primary rounded-full p-2 mr-3">
              <Package className="h-4 w-4 text-primary-foreground" />
            </div>
            Inventory AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">📦 Restock Alert</h4>
              <p className="text-sm text-muted-foreground">
                Based on sales velocity, Office Chairs will run out in 5 days. 
                Place a reorder now to avoid stockouts during peak season.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">💡 Optimization Tip</h4>
              <p className="text-sm text-muted-foreground">
                Your fast-moving items represent 80% of sales but only 20% of inventory value. 
                Focus on optimizing stock levels for these high-velocity products.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}