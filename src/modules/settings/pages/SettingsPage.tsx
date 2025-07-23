import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  Settings, 
  User, 
  Building2, 
  Globe, 
  Bell, 
  Shield, 
  Palette,
  Database,
  Save
} from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure your system preferences and account settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="space-y-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Settings Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Building2 className="mr-2 h-4 w-4" />
                Company Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Globe className="mr-2 h-4 w-4" />
                Localization
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Palette className="mr-2 h-4 w-4" />
                Appearance
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" />
                Data & Backup
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Profile Settings
              </CardTitle>
              <CardDescription>Manage your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name" defaultValue="John Doe" />
                <Input label="Email" defaultValue="john@example.com" type="email" />
                <Input label="Phone" defaultValue="+1 234 567 8900" />
                <Input label="Position" defaultValue="Business Owner" />
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Company Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="mr-2 h-5 w-5" />
                Company Settings
              </CardTitle>
              <CardDescription>Configure your company information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Company Name" defaultValue="African Business Ltd" />
                <Input label="Tax Number" defaultValue="TAX123456789" />
                <Input label="Phone" defaultValue="+233 20 123 4567" />
                <Input label="Email" defaultValue="info@africanbusiness.com" type="email" />
              </div>
              <Input label="Address" defaultValue="123 Business Street, Accra, Ghana" />
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* System Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                System Preferences
              </CardTitle>
              <CardDescription>Configure system-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Currency</label>
                  <select className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GHS (₵)</option>
                    <option>NGN (₦)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Language</label>
                  <select className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                    <option>English</option>
                    <option>French</option>
                    <option>Arabic</option>
                    <option>Swahili</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Timezone</label>
                  <select className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                    <option>GMT (UTC+0)</option>
                    <option>WAT (UTC+1)</option>
                    <option>CAT (UTC+2)</option>
                    <option>EAT (UTC+3)</option>
                  </select>
                </div>
              </div>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Coming Soon Features */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Additional configuration options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">More Settings Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced configuration options including integrations, custom fields, 
                  and workflow automation will be available here.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div>✓ API Integrations</div>
                  <div>✓ Custom Fields</div>
                  <div>✓ Workflow Automation</div>
                  <div>✓ Email Templates</div>
                  <div>✓ Report Scheduling</div>
                  <div>✓ User Permissions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}