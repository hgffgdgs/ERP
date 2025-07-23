import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FolderOpen, Plus, CheckCircle, Clock, AlertTriangle, Users } from 'lucide-react'

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Project Management</h1>
          <p className="text-muted-foreground">Track projects, tasks, and team collaboration</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              This quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Active contributors
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Message */}
      <Card>
        <CardHeader>
          <CardTitle>Project Management System</CardTitle>
          <CardDescription>Complete project and task management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Advanced Project Features Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              Comprehensive project management with Gantt charts, resource allocation, 
              time tracking, and team collaboration tools will be available here.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div>✓ Project Planning</div>
              <div>✓ Task Management</div>
              <div>✓ Gantt Charts</div>
              <div>✓ Time Tracking</div>
              <div>✓ Resource Allocation</div>
              <div>✓ Team Collaboration</div>
              <div>✓ Progress Reports</div>
              <div>✓ Budget Tracking</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="bg-primary rounded-full p-2 mr-3">
              <FolderOpen className="h-4 w-4 text-primary-foreground" />
            </div>
            Project AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">⚠️ Risk Alert</h4>
              <p className="text-sm text-muted-foreground">
                "Website Redesign" project is 3 days behind schedule. 
                Consider reallocating resources or adjusting timeline to meet deadline.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">🚀 Productivity Insight</h4>
              <p className="text-sm text-muted-foreground">
                Your team completes projects 15% faster when using agile methodology. 
                Consider adopting this approach for upcoming projects.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}