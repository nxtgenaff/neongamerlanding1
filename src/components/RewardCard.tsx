
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface RewardCardProps {
  title: string;
  description: string;
  image: string;
  glowColor?: 'blue' | 'purple' | 'pink';
}

const RewardCard = ({ title, description, image, glowColor = 'blue' }: RewardCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const gradientStyles = {
    blue: 'from-gaming-blue/20 via-gaming-blue/5 to-transparent',
    purple: 'from-gaming-purple/20 via-gaming-purple/5 to-transparent',
    pink: 'from-gaming-pink/20 via-gaming-pink/5 to-transparent'
  };
  
  const textStyles = {
    blue: 'text-gaming-blue',
    purple: 'text-gaming-purple',
    pink: 'text-gaming-pink'
  };

  const buttonBgStyles = {
    blue: 'bg-gaming-blue hover:bg-gaming-blue/90',
    purple: 'bg-gaming-purple hover:bg-gaming-purple/90',
    pink: 'bg-gaming-pink hover:bg-gaming-pink/90'
  };

  return (
    <div 
      className={`relative rounded-[28px] overflow-hidden transition-all duration-500 h-full transform ${isHovered ? 'scale-[1.02]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 300)}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark via-gaming-dark/90 to-gaming-dark/70 z-10" />
      <div 
        className={`absolute inset-0 bg-gradient-to-r ${gradientStyles[glowColor]} opacity-0 ${isHovered ? 'opacity-100' : ''} transition-opacity duration-500 z-20`}
      />
      
      <div className="relative p-6 sm:p-7 z-30 h-full flex flex-col justify-between">
        <div>
          <h3 className={`font-display font-bold text-2xl mb-3 ${textStyles[glowColor]}`}>
            {title}
          </h3>
          <p className="text-white/80 mb-4">
            {description}
          </p>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg backdrop-blur-sm mb-4">
            <span className="text-xs text-white/50">Starting from</span>
            <span className={`text-sm font-bold ${textStyles[glowColor]}`}>5,000 Units</span>
          </div>
          
          <Button 
            className={`w-full ${buttonBgStyles[glowColor]} text-white font-medium transition-all duration-300`}
          >
            Play Now <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RewardCard;
