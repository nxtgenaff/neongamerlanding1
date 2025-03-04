
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
    <div className="glass-panel p-6 transition-all duration-300 hover:shadow-neon-blue">
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gaming-blue/20 mr-4">
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-display font-bold text-white">{name}</h4>
          <p className="text-xs text-white/50">{game}</p>
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
      
      <p className="text-sm text-white/80 italic">"{quote}"</p>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-gaming-blue">Verified Mistplay User</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
