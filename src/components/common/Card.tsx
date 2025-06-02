import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  onClick,
  hoverable = false
}) => {
  const baseStyles = 'bg-white rounded-lg shadow-card p-6';
  const hoverStyles = hoverable 
    ? 'transition-shadow duration-300 hover:shadow-card-hover cursor-pointer' 
    : '';
  
  const combinedClassName = `${baseStyles} ${hoverStyles} ${className}`.trim();
  
  return (
    <div className={combinedClassName} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;