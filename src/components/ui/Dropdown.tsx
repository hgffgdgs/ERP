import React, { useState, useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import { ChevronDown } from 'lucide-react'

interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'left' | 'right' | 'center'
  className?: string
}

const Dropdown: React.FC<DropdownProps> = ({ 
  trigger, 
  children, 
  align = 'left',
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const alignmentClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2'
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>
      
      {isOpen && (
        <div className={clsx(
          'absolute z-50 mt-2 min-w-[200px] bg-card border border-border rounded-lg shadow-lg',
          'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200',
          alignmentClasses[align],
          className
        )}>
          {children}
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

const DropdownItem: React.FC<DropdownItemProps> = ({ 
  children, 
  icon, 
  disabled, 
  className,
  ...props 
}) => {
  return (
    <div
      className={clsx(
        'flex items-center px-4 py-2 text-sm cursor-pointer transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'first:rounded-t-lg last:rounded-b-lg',
        disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
        className
      )}
      {...props}
    >
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </div>
  )
}

const DropdownSeparator: React.FC = () => (
  <div className="h-px bg-border my-1" />
)

export { Dropdown, DropdownItem, DropdownSeparator }