
import { useState, useRef, useEffect } from 'react';
import { Star, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface MistplayGameCardProps {
  title: string;
  genre: string;
  points: number;
  image: string;
  popularity: 'Hot' | 'Trending' | 'Popular' | 'New' | 'Editor\'s Choice' | 'Top Rated' | 'Free';
  description?: string;
  downloads?: string;
  rating?: number;
  link?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const MistplayGameCard = ({ 
  title, 
  genre, 
  points, 
  image, 
  popularity, 
  description,
  downloads = "100M+",
  rating = 4.5,
  link,
  onSwipeLeft,
  onSwipeRight
}: MistplayGameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  const minSwipeDistance = 15;
  
  const popularityColors: Record<string, string> = {
    'Hot': 'bg-gaming-pink text-white',
    'Trending': 'bg-gaming-purple text-white',
    'Popular': 'bg-gaming-blue text-white',
    'New': 'bg-gaming-accent text-gaming-dark',
    'Editor\'s Choice': 'bg-[#FF69B4] text-white',
    'Top Rated': 'bg-[#FF69B4] text-white',
    'Free': 'bg-black/80 text-white'
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(false);
    
    if (cardRef.current) {
      cardRef.current.classList.add('touch-active');
    }
    
    if (e.target instanceof HTMLButtonElement) {
      e.preventDefault();
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    
    if (touchStart && Math.abs(touchStart - e.targetTouches[0].clientX) > 3) {
      setIsSwiping(true);
      e.preventDefault();
    }
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (cardRef.current) {
      cardRef.current.classList.remove('touch-active');
    }
    
    if (!isSwiping) {
      setTimeout(() => setIsHovered(false), 100);
    } else {
      setIsHovered(false);
    }
    
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
      e.preventDefault();
      e.stopPropagation();
    }
    
    setIsSwiping(false);
  };
  
  const handleClick = (e: React.MouseEvent) => {
    if (isSwiping) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const card = cardRef.current;
    
    const preventScrollOnSwipe = (e: TouchEvent) => {
      if (isSwiping) {
        e.preventDefault();
      }
    };
    
    if (card) {
      card.addEventListener('touchmove', preventScrollOnSwipe, { passive: false });
    }
    
    return () => {
      if (card) {
        card.removeEventListener('touchmove', preventScrollOnSwipe);
      }
    };
  }, [isSwiping]);

  return (
    <a 
      ref={cardRef}
      href={isSwiping ? undefined : (link || "#")}
      className={cn(
        "glass-panel transition-all duration-300 border border-white/5 rounded-xl overflow-hidden block h-[280px] will-change-transform momentum-scroll no-select",
        isHovered && "neon-border shadow-neon-glow"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onClick={handleClick}
      style={{
        touchAction: isSwiping ? 'none' : 'manipulation',
        transform: 'translateZ(0)',
      }}
    >
      <div className="relative h-3/5">
        <div className="h-full overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out will-change-transform"
            loading="lazy"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden'
            }}
          />
          
          <div 
            className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-200 ${
              isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          >
            <button className="bg-gaming-blue hover:bg-gaming-purple text-white font-display font-bold py-2 px-4 rounded-full flex items-center transition-all duration-300 transform hover:scale-105 touch-target touch-active text-sm">
              <Download size={16} className="mr-1" />
              Play Now
            </button>
          </div>
        </div>
        
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {(popularity === 'Editor\'s Choice' || popularity === 'Top Rated') && (
            <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${popularityColors['Editor\'s Choice']}`}>
              Editor's Choice
            </div>
          )}
          {(popularity === 'Top Rated' || popularity === 'Hot') && (
            <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${popularityColors['Top Rated']}`}>
              Top Rated
            </div>
          )}
        </div>
        
        <div className="absolute top-2 right-2">
          <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${popularityColors['Free']}`}>
            Free
          </div>
        </div>
        
        <div className={`absolute left-1 top-1/2 transform -translate-y-1/2 bg-black/60 rounded-full p-1 text-white cursor-pointer transition-opacity ${isHovered ? 'opacity-70 hover:opacity-100' : 'opacity-0'}`}>
          <ChevronLeft size={20} />
        </div>
        <div className={`absolute right-1 top-1/2 transform -translate-y-1/2 bg-black/60 rounded-full p-1 text-white cursor-pointer transition-opacity ${isHovered ? 'opacity-70 hover:opacity-100' : 'opacity-0'}`}>
          <ChevronRight size={20} />
        </div>
      </div>
      
      <div className="p-3 h-2/5 flex flex-col justify-between">
        <h3 className="font-display font-bold text-base text-white truncate">{title}</h3>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white ml-1 font-bold text-xs">{rating}</span>
          </div>
          
          <span className="text-xs text-white/70">{genre}</span>
        </div>
      </div>
    </a>
  );
};

export default MistplayGameCard;
