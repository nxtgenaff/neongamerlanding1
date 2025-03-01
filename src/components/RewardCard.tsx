
import { useState } from 'react';

interface RewardCardProps {
  title: string;
  description: string;
  image: string;
  glowColor?: 'blue' | 'purple' | 'pink';
}

const RewardCard = ({ title, description, image, glowColor = 'blue' }: RewardCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const glowStyles = {
    blue: 'shadow-neon-blue border-gaming-blue/30',
    purple: 'shadow-neon-purple border-gaming-purple/30',
    pink: 'shadow-neon-pink border-gaming-pink/30'
  };
  
  const textStyles = {
    blue: 'text-gaming-blue',
    purple: 'text-gaming-purple',
    pink: 'text-gaming-pink'
  };

  return (
    <div 
      className={`glass-panel p-5 transition-all duration-500 border ${
        isHovered ? glowStyles[glowColor] : 'border-white/5'
      } ${isHovered ? 'transform -translate-y-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-40 mb-4 overflow-hidden rounded-lg bg-gaming-darker">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        <div className={`absolute inset-0 opacity-0 ${
          isHovered ? 'opacity-20' : ''
        } transition-opacity duration-500 bg-${glowColor}-glow`} />
      </div>
      <h3 className={`font-display font-bold text-xl mb-2 ${textStyles[glowColor]}`}>
        {title}
      </h3>
      <p className="text-sm text-white/70">
        {description}
      </p>
      
      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
        <span className="text-xs text-white/50">Starting from</span>
        <span className={`text-sm font-bold ${textStyles[glowColor]}`}>5,000 Units</span>
      </div>
    </div>
  );
};

export default RewardCard;
