import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary'
  size?: 'default' | 'sm' | 'lg'
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', isLoading, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:opacity-50"
    
    const variants = {
      default: "bg-blue-500 text-white hover:bg-blue-600",
      outline: "border border-gray-300 bg-white hover:bg-gray-50", 
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200"
    }

    const sizes = {
      default: "h-9 px-4 py-2 text-sm",
      sm: "h-8 px-3 py-1 text-xs",
      lg: "h-10 px-8 py-2 text-base"
    }

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`

    return (
      <button
        className={combinedClassName}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
