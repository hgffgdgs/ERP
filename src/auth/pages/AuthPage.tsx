import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useAuth } from '@/auth/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Building2, Users, TrendingUp, Shield } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type LoginFormData = z.infer<typeof loginSchema>
type SignupFormData = z.infer<typeof signupSchema>

export default function AuthPage() {
  const { signIn, signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const { error } = await signIn(data.email, data.password)
      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Welcome back!')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true)
    try {
      const { error } = await signUp(data.email, data.password, data.fullName)
      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Account created successfully! Please check your email to verify your account.')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-african-orange/10 via-background to-african-gold/10 african-pattern">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-primary rounded-2xl p-4 mr-4">
                <Building2 className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">African ERP</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Modern business management system designed for African SMEs. 
              Streamline your operations with AI-powered insights.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Features Section */}
            <div className="space-y-8">
              <div className="grid gap-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Complete CRM</h3>
                    <p className="text-muted-foreground">
                      Manage customers, leads, and sales pipeline with AI-powered insights and automation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 rounded-lg p-3">
                    <TrendingUp className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Smart Analytics</h3>
                    <p className="text-muted-foreground">
                      Get real-time business insights with intelligent reporting and forecasting.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-african-green/10 rounded-lg p-3">
                    <Shield className="h-6 w-6 text-african-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Secure & Scalable</h3>
                    <p className="text-muted-foreground">
                      Enterprise-grade security with role-based access control and data protection.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border">
                <h4 className="font-semibold mb-3">All-in-One Business Solution</h4>
                <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <div>✓ Customer Relationship Management</div>
                  <div>✓ Inventory Management</div>
                  <div>✓ Invoicing & Billing</div>
                  <div>✓ Project Management</div>
                  <div>✓ Human Resources</div>
                  <div>✓ Financial Accounting</div>
                  <div>✓ Sales & Purchasing</div>
                  <div>✓ AI Assistant</div>
                </div>
              </div>
            </div>

            {/* Auth Forms */}
            <div className="max-w-md mx-auto w-full">
              <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Get Started</CardTitle>
                  <CardDescription>
                    Sign in to your account or create a new one
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Sign In</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="space-y-4 mt-6">
                      <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                        <div>
                          <Input
                            type="email"
                            placeholder="Email address"
                            {...loginForm.register('email')}
                            error={loginForm.formState.errors.email?.message}
                          />
                        </div>
                        <div>
                          <Input
                            type="password"
                            placeholder="Password"
                            {...loginForm.register('password')}
                            error={loginForm.formState.errors.password?.message}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-4 mt-6">
                      <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                        <div>
                          <Input
                            type="text"
                            placeholder="Full name"
                            {...signupForm.register('fullName')}
                            error={signupForm.formState.errors.fullName?.message}
                          />
                        </div>
                        <div>
                          <Input
                            type="email"
                            placeholder="Email address"
                            {...signupForm.register('email')}
                            error={signupForm.formState.errors.email?.message}
                          />
                        </div>
                        <div>
                          <Input
                            type="password"
                            placeholder="Password"
                            {...signupForm.register('password')}
                            error={signupForm.formState.errors.password?.message}
                          />
                        </div>
                        <div>
                          <Input
                            type="password"
                            placeholder="Confirm password"
                            {...signupForm.register('confirmPassword')}
                            error={signupForm.formState.errors.confirmPassword?.message}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Creating account...' : 'Create Account'}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <div className="text-center mt-6 text-sm text-muted-foreground">
                <p>Demo credentials:</p>
                <p>Email: admin@africanerp.com</p>
                <p>Password: demo123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}