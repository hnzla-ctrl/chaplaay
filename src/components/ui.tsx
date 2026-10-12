import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'subtle' | 'card';
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', variant = 'card', hover = true, onClick }: GlassCardProps) {
  const variantClasses = {
    default: 'glass',
    dark: 'glass-dark',
    subtle: 'glass-subtle',
    card: 'glass-card',
  };

  return (
    <div
      onClick={onClick}
      className={`
        ${variantClasses[variant]}
        rounded-2xl
        ${hover ? 'transition-smooth cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gold';
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}

export function GradientText({ children, className = '', variant = 'default', as: Tag = 'span' }: GradientTextProps) {
  return (
    <Tag className={`${variant === 'gold' ? 'gradient-text-gold' : 'gradient-text'} ${className}`}>
      {children}
    </Tag>
  );
}

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'premium';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-brand-50 text-brand-700 border-brand-100',
    success: 'bg-green-50 text-green-700 border-green-100',
    warning: 'bg-amber-50 text-amber-700 border-amber-100',
    danger: 'bg-red-50 text-red-700 border-red-100',
    premium: 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 border-amber-200',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export function Button({ children, variant = 'primary', size = 'md', className = '', onClick, disabled, type = 'button' }: ButtonProps) {
  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30',
    secondary: 'bg-white text-gray-900 border border-gray-200 hover:border-brand-300 hover:text-brand-600',
    ghost: 'text-gray-600 hover:text-brand-600 hover:bg-brand-50',
    glass: 'glass text-gray-900 hover:bg-white/80',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold rounded-xl
        transition-smooth
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
