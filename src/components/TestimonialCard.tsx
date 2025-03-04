
import { Star } from 'lucide-react';
import { useState } from 'react';

interface TestimonialCardProps {
  name: string;
  game: string;
  avatar: string;
  quote: string;
  stars: number;
}

const TestimonialCard = ({ name, game, avatar, quote, stars }: TestimonialCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="responsive-card rounded-[20px] overflow-hidden transition-all duration-500 bg-gradient-to-br from-gaming-darker to-gaming-dark border border-white/5 transform shadow-xl h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 300)}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gaming-blue via-gaming-purple to-gaming-pink opacity-60" />
      
      <div className="p-4 sm:p-5 relative z-10 h-full flex flex-col">
        <div className="flex items-center mb-4">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-gaming-blue/30 mr-3">
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-display font-bold text-base sm:text-lg text-white">{name}</h4>
            <p className="text-xs sm:text-sm text-white/50">{game}</p>
          </div>
        </div>
        
        <div className="flex mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={i < stars ? "text-gaming-accent fill-gaming-accent" : "text-white/20"} 
            />
          ))}
        </div>
        
        <p className="text-xs sm:text-sm text-white/80 italic leading-relaxed flex-grow line-clamp-4">{quote}</p>
        
        <div className="mt-4 pt-3 border-t border-white/10">
          <p className="text-xs text-gaming-blue flex items-center">
            <span className="inline-block w-2 h-2 bg-gaming-blue rounded-full mr-2"></span>
            Verified Mistplay User
          </p>
        </div>
      </div>
      
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-gaming-blue/5 via-gaming-purple/5 to-gaming-pink/5 opacity-0 ${isHovered ? 'opacity-100' : ''} transition-opacity duration-500`}
      />
    </div>
  );
};

export default TestimonialCard;
