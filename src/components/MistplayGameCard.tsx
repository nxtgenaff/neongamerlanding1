
import { useState } from 'react';
import { Star } from 'lucide-react';

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

  return (
    <a 
      href={link || "#"}
      className={`overflow-hidden block transition-all duration-500 transform ${isHovered ? 'scale-[1.02]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 300)}
    >
      <div className="rounded-[28px] overflow-hidden relative bg-gradient-to-br from-gaming-darker to-gaming-dark border border-white/5">
        <div className="relative">
          <div className="h-52 sm:h-56 overflow-hidden">
            <div 
              className="w-full h-full bg-center bg-cover transition-transform duration-700 ease-in-out"
              style={{
                backgroundImage: `url(${image})`,
                transform: isHovered ? 'scale(1.08)' : 'scale(1.02)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark via-transparent to-transparent opacity-90" />
            <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${popularityColors[popularity]}`}>
              {popularity}
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-5 z-10">
            <h3 className="font-display font-bold text-xl text-white mb-2 line-clamp-1">{title}</h3>
            <p className="text-xs text-white/60 mb-3">{genre}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star size={16} className="text-gaming-accent fill-gaming-accent mr-1" />
                <span className="text-xs text-white/70">Earn up to</span>
              </div>
              <div className="text-gaming-accent font-bold text-sm">{points} Units</div>
            </div>
          </div>
        </div>
        
        <div 
          className={`absolute inset-0 opacity-0 ${isHovered ? 'opacity-20' : ''} transition-opacity duration-500 bg-gradient-to-br from-gaming-blue via-gaming-purple to-gaming-pink`}
        />
      </div>
    </a>
  );
};

export default MistplayGameCard;
