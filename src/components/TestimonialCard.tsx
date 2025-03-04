
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TestimonialCardProps {
  name: string;
  game: string;
  avatar: string;
  quote: string;
  stars: number;
  isCurrent?: boolean;
  position?: 'prev' | 'next' | 'current';
}

const TestimonialCard = ({ 
  name, 
  game, 
  avatar, 
  quote, 
  stars, 
  isCurrent = false,
  position
}: TestimonialCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Set initial rotation based on card position
  useEffect(() => {
    if (position === 'prev') {
      setRotation({ x: 0, y: -10 });
    } else if (position === 'next') {
      setRotation({ x: 0, y: 10 });
    } else {
      setRotation({ x: 0, y: 0 });
    }
  }, [position]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    
    // Calculate rotation (max 15deg)
    const rotateY = ((x / rect.width) - 0.5) * 15;
    const rotateX = ((y / rect.height) - 0.5) * -15;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    // Reset to position-based rotation instead of flat
    if (position === 'prev') {
      setRotation({ x: 0, y: -10 });
    } else if (position === 'next') {
      setRotation({ x: 0, y: 10 });
    } else {
      setRotation({ x: 0, y: 0 });
    }
  };

  // Calculate dynamic shadow based on mouse position
  const getShadowStyle = () => {
    if (!isHovered) return {};
    
    const shadowX = (mousePosition.x / 100) - 0.5;
    const shadowY = (mousePosition.y / 100) - 0.5;
    
    return {
      boxShadow: `
        ${shadowX * 20}px ${shadowY * 20}px 25px rgba(0,0,0,0.2),
        0 10px 10px rgba(0,0,0,0.1)
      `
    };
  };

  // Calculate z-index and scale based on position
  const getPositionStyles = () => {
    if (position === 'current') {
      return 'z-30 scale-100';
    } else if (position === 'prev' || position === 'next') {
      return 'z-20 scale-[0.95] opacity-70';
    } else {
      return 'z-10 scale-[0.9] opacity-50';
    }
  };

  return (
    <div 
      className={`swipe-card-wrapper perspective-1000 transition-all duration-700 ${getPositionStyles()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetRotation();
      }}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => {
        setTimeout(() => setIsHovered(false), 300);
        resetRotation();
      }}
    >
      <div 
        className={`relative rounded-[20px] sm:rounded-[28px] overflow-hidden transition-all duration-500 bg-gradient-to-br from-gaming-darker to-gaming-dark border border-white/5 swipe-card transform ${isHovered ? 'scale-[1.02]' : ''}`}
        style={{ 
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          ...getShadowStyle()
        }}
        onMouseMove={handleMouseMove}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gaming-blue via-gaming-purple to-gaming-pink opacity-60" />
        
        <div className="p-4 sm:p-6 relative z-10">
          <div className="flex items-center mb-4 sm:mb-5">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-gaming-blue/30 mr-3 sm:mr-4">
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg sm:text-xl text-white">{name}</h4>
              <p className="text-xs sm:text-sm text-white/50">{game}</p>
            </div>
          </div>
          
          <div className="flex mb-3 sm:mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < stars ? "text-gaming-accent fill-gaming-accent" : "text-white/20"} 
              />
            ))}
          </div>
          
          <p className="text-sm sm:text-base text-white/80 italic leading-relaxed">{quote}</p>
          
          <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-white/10">
            <p className="text-xs sm:text-sm text-gaming-blue flex items-center">
              <span className="inline-block w-2 h-2 bg-gaming-blue rounded-full mr-2"></span>
              Verified Mistplay User
            </p>
          </div>
        </div>
        
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-gaming-blue/5 via-gaming-purple/5 to-gaming-pink/5 opacity-0 ${isHovered ? 'opacity-100' : ''} transition-opacity duration-500`}
        />

        {/* 3D lighting effects */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 ${isHovered ? 'opacity-20' : ''} transition-opacity duration-500`}
          style={{ 
            transform: 'translateZ(20px)', 
            transformStyle: 'preserve-3d' 
          }}
        />
      </div>
    </div>
  );
};

export default TestimonialCard;
