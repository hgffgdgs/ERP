import React from 'react'
import { clsx } from 'clsx'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  fallback?: string
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, size = 'md', fallback, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false)
    
    const sizes = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl',
      '2xl': 'h-20 w-20 text-2xl'
    }

    const showFallback = !src || imageError
    const initials = fallback || alt?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'

    return (
      <div
        className={clsx(
          'relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground font-medium overflow-hidden',
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {!showFallback ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="select-none">{initials}</span>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export { Avatar }