
import { useState } from 'react';
import { Star, Play } from 'lucide-react';
import { cn } from '../lib/utils';

interface MistplayGameCardProps {
  title: string;
  genre: string;
  points: number;
  image: string;
  popularity: 'Hot' | 'Trending' | 'Popular' | 'New';
  link?: string;
}

const MistplayGameCard = ({ title, genre, points, image, popularity, link }: MistplayGameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const popularityColors = {
    'Hot': 'bg-gaming-pink text-white',
    'Trending': 'bg-gaming-purple text-white',
    'Popular': 'bg-gaming-blue text-white',
    'New': 'bg-gaming-accent text-gaming-dark'
  };

  // Handle touch events for mobile
  const handleTouchStart = () => {
    setIsHovered(true);
  };
  
  const handleTouchEnd = () => {
    // Slight delay to allow for tapping the button
    setTimeout(() => setIsHovered(false), 500);
  };

  return (
    <a 
      href={link || "#"}
      className={cn(
        "glass-panel transition-all duration-300 border border-white/5 rounded-lg overflow-hidden block",
        isHovered && "neon-border shadow-neon-glow"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative">
        {/* Larger image area */}
        <div className="h-48 sm:h-52 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
            loading="lazy"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          
          {/* Play Now button that appears on hover/touch */}
          <div 
            className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button className="bg-gaming-blue hover:bg-gaming-purple text-white font-display font-bold py-3 px-6 rounded-full flex items-center transition-all duration-300 transform hover:scale-105 touch-target">
              <Play size={20} className="mr-2 fill-white" />
              Play Now
            </button>
          </div>
        </div>
        
        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold ${popularityColors[popularity]}`}>
          {popularity}
        </div>
      </div>
      
      {/* Smaller content area at the bottom */}
      <div className="p-4">
        <h3 className="font-display font-bold text-lg text-white mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-white/50 mb-3">{genre}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star size={16} className="text-gaming-accent fill-gaming-accent mr-1" />
            <span className="text-sm text-white/70">Earn up to</span>
          </div>
          <div className="text-gaming-accent font-bold">{points} Units</div>
        </div>
      </div>
    </a>
  );
};

export default MistplayGameCard;
