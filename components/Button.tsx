import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'glass' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  size = 'medium', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "rounded-full font-display font-semibold transition-all duration-300 flex items-center justify-center gap-2 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed uppercase relative overflow-hidden group";
  
  const sizeStyles = {
    small: "py-2 px-6 text-xs",
    medium: "py-3 px-8 text-sm",
    large: "py-4 px-12 text-base"
  };
  
  const variants = {
    primary: "bg-gradient-to-r from-hux-turquoise to-hux-turquoiseLight text-white shadow-lg hover:shadow-hux-turquoise/50 border border-transparent hover:-translate-y-0.5",
    secondary: "bg-white text-hux-turquoise border border-hux-turquoise hover:bg-hux-turquoise hover:text-white shadow-lg hover:shadow-hux-turquoise/30",
    outline: "border border-hux-turquoise text-hux-turquoise hover:bg-hux-turquoise/5",
    ghost: "bg-transparent text-neutral-600 hover:text-hux-turquoise",
    glass: "glass text-hux-dark hover:bg-white/80 border border-white/50 shadow-sm hover:shadow-md"
  };

  return (
    <button 
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {/* Shiny overlay effect for primary buttons */}
      {variant === 'primary' && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[slideUp_0.5s_ease-in-out]" />
      )}
      {children}
    </button>
  );
};