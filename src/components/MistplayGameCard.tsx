
import { useState } from 'react';
import { Star } from 'lucide-react';

interface MistplayGameCardProps {
  title: string;
  genre: string;
  points: number;
  image: string;
  popularity: 'Hot' | 'Trending' | 'Popular' | 'New';
}

const MistplayGameCard = ({ title, genre, points, image, popularity }: MistplayGameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const popularityColors = {
    'Hot': 'bg-gaming-pink text-white',
    'Trending': 'bg-gaming-purple text-white',
    'Popular': 'bg-gaming-blue text-white',
    'New': 'bg-gaming-accent text-gaming-dark'
  };

  return (
    <div 
      className={`glass-panel transition-all duration-500 border border-white/5 rounded-lg overflow-hidden ${isHovered ? 'shadow-neon-blue transform -translate-y-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="h-40 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        </div>
        
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${popularityColors[popularity]}`}>
          {popularity}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-display font-bold text-lg text-white mb-1">{title}</h3>
        <p className="text-xs text-white/50 mb-3">{genre}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star size={14} className="text-gaming-accent fill-gaming-accent mr-1" />
            <span className="text-xs text-white/70">Earn up to</span>
          </div>
          <div className="text-gaming-accent font-bold text-sm">{points} Units</div>
        </div>
      </div>
    </div>
  );
};

export default MistplayGameCard;
