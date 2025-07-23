import React from 'react'
import { clsx } from 'clsx'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'error'
  showValue?: boolean
  animated?: boolean
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value, 
    max = 100, 
    size = 'md', 
    variant = 'default',
    showValue = false,
    animated = true,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    
    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3'
    }
    
    const variants = {
      default: 'bg-primary',
      success: 'bg-green-500',
      warning: 'bg-orange-500',
      error: 'bg-red-500'
    }

    return (
      <div className="space-y-1">
        {showValue && (
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{Math.round(percentage)}%</span>
            <span>{value}/{max}</span>
          </div>
        )}
        <div
          className={clsx(
            'w-full bg-muted rounded-full overflow-hidden',
            sizes[size],
            className
          )}
          ref={ref}
          {...props}
        >
          <div
            className={clsx(
              'h-full rounded-full transition-all duration-500 ease-out',
              variants[variant],
              animated && 'animate-pulse'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'

export { Progress }