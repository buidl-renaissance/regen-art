import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'danger' | 'default';
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  style,
  onMouseOver,
  onMouseOut,
  ...props
}) => {
  // Base styles
  const baseStyle = {
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Size styles
  const sizeStyles = {
    small: { padding: '6px 12px', fontSize: '0.875rem' },
    medium: { padding: '10px 15px', fontSize: '1rem' },
    large: { padding: '12px 20px', fontSize: '1.125rem' },
  };

  // Variant styles
  const variantStyles = {
    primary: { backgroundColor: '#4285f4', color: 'white' },
    success: { backgroundColor: '#34a853', color: 'white' },
    danger: { backgroundColor: '#ea4335', color: 'white' },
    default: { backgroundColor: '#f1f3f4', color: '#202124' },
  };

  // Hover colors
  const hoverColors = {
    primary: '#3367d6',
    success: '#2e8b57',
    danger: '#c62828',
    default: '#e0e0e0',
  };

  // Combine styles
  const combinedStyle = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  // Handle hover states
  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = hoverColors[variant];
    onMouseOver?.(e);
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = variantStyles[variant].backgroundColor;
    onMouseOut?.(e);
  };

  return (
    <button
      style={combinedStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
