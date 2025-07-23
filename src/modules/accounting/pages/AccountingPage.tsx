import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Calculator, TrendingUp, TrendingDown, PieChart, FileText, Download } from 'lucide-react'

export default function AccountingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Accounting & Finance</h1>
          <p className="text-muted-foreground">Financial records, reports, and accounting management</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125,450</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Liabilities</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,200</div>
            <p className="text-xs text-muted-foreground">
              -5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$80,250</div>
            <p className="text-xs text-muted-foreground">
              Assets - Liabilities
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Message */}
      <Card>
        <CardHeader>
          <CardTitle>Accounting Features</CardTitle>
          <CardDescription>Complete financial management system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Full Accounting Module Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              Advanced accounting features including chart of accounts, journal entries, 
              financial statements, and automated bookkeeping will be available here.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div>✓ Chart of Accounts</div>
              <div>✓ Journal Entries</div>
              <div>✓ Balance Sheet</div>
              <div>✓ P&L Statement</div>
              <div>✓ Cash Flow</div>
              <div>✓ Tax Reports</div>
              <div>✓ Bank Reconciliation</div>
              <div>✓ Audit Trail</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="bg-primary rounded-full p-2 mr-3">
              <Calculator className="h-4 w-4 text-primary-foreground" />
            </div>
            Financial AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">💡 Cost Optimization</h4>
              <p className="text-sm text-muted-foreground">
                Your operational costs have increased by 8% this quarter. 
                Review recurring expenses to identify potential savings opportunities.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">📈 Growth Trend</h4>
              <p className="text-sm text-muted-foreground">
                Your net worth has grown consistently for 6 months. 
                Consider reinvesting 15% of profits to accelerate business growth.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}