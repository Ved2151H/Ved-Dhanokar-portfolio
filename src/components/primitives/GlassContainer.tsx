import React from 'react';

export interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  children: React.ReactNode;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  id,
  size = 'lg',
  className = '',
  children,
  ...props
}) => {
  const getMaxWidth = () => {
    switch (size) {
      case 'sm':
        return 'max-w-3xl';
      case 'md':
        return 'max-w-5xl';
      case 'full':
        return 'max-w-full';
      case 'lg':
      default:
        return 'max-w-7xl';
    }
  };

  return (
    <div
      id={id}
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${getMaxWidth()} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
