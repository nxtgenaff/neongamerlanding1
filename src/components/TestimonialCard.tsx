
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  game: string;
  avatar: string;
  quote: string;
  stars: number;
}

const TestimonialCard = ({ name, game, avatar, quote, stars }: TestimonialCardProps) => {
  return (
    <div className="glass-panel transition-all duration-300 hover:shadow-neon-blue rounded-xl overflow-hidden h-[260px]">
      {/* Top section */}
      <div className="p-4 pb-3">
        <div className="flex items-center mb-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gaming-blue/20 mr-3">
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-sm">{name}</h4>
            <p className="text-xs text-white/50">{game}</p>
          </div>
        </div>
        
        <div className="flex mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < stars ? "text-gaming-accent fill-gaming-accent" : "text-white/20"} 
            />
          ))}
        </div>
        
        <p className="text-xs text-white/80 italic line-clamp-4">"{quote}"</p>
      </div>
      
      {/* Border line */}
      <div className="w-full h-px bg-white/10"></div>
      
      {/* Bottom section */}
      <div className="p-3">
        <p className="text-xs text-gaming-blue">Verified Mistplay User</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
