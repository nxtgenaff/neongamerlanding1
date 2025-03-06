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
        "glass-panel transition-all duration-300 border border-white/5 rounded-2xl overflow-hidden block h-full will-change-transform momentum-scroll no-select",
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
      <div className="relative">
        <div className="h-64 overflow-hidden">
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
            <button className="bg-gaming-blue hover:bg-gaming-purple text-white font-display font-bold py-3 px-6 rounded-full flex items-center transition-all duration-300 transform hover:scale-105 touch-target touch-active">
              <Download size={20} className="mr-2" />
              Play Now
            </button>
          </div>
        </div>
        
        <div className="absolute top-2 left-2 flex flex-wrap gap-2">
          {(popularity === 'Editor\'s Choice' || popularity === 'Top Rated') && (
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${popularityColors['Editor\'s Choice']}`}>
              Editor's Choice
            </div>
          )}
          {(popularity === 'Top Rated' || popularity === 'Hot') && (
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${popularityColors['Top Rated']}`}>
              Top Rated
            </div>
          )}
        </div>
        
        <div className="absolute top-2 right-2">
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${popularityColors['Free']}`}>
            Free
          </div>
        </div>
        
        <div className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 rounded-full p-2 text-white cursor-pointer transition-opacity ${isHovered ? 'opacity-70 hover:opacity-100' : 'opacity-0'}`}>
          <ChevronLeft size={24} />
        </div>
        <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 rounded-full p-2 text-white cursor-pointer transition-opacity ${isHovered ? 'opacity-70 hover:opacity-100' : 'opacity-0'}`}>
          <ChevronRight size={24} />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Star size={18} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white ml-1 font-bold">{rating}</span>
          </div>
          <div className="flex items-center">
            <Download size={12} className="text-white/70 mr-1" />
            <span className="text-white/70 text-xs">{downloads}</span>
          </div>
        </div>
        
        <h3 className="font-display font-bold text-xl text-white mb-1">{title}</h3>
        
        <div className="flex items-center text-sm text-white/70 mb-2">
          <span className="mr-2">{genre}</span>
          <span className="w-1 h-1 bg-white/50 rounded-full"></span>
          <span className="ml-2">{downloads}</span>
        </div>
        
        <p className="text-sm text-white/70 mb-4 line-clamp-2">
          {description || "Join the adventure with the cutest pig thief in this addictive simulation game. Collect coins..."}
        </p>
        
        <button className="w-full bg-[#FF69B4] hover:bg-gaming-purple text-white font-display font-bold py-3 rounded-full flex items-center justify-center transition-all duration-300 touch-target touch-active will-change-transform">
          Download Now
        </button>
      </div>
    </a>
  );
};

export default MistplayGameCard;
