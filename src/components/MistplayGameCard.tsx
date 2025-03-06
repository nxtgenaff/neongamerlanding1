
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
  
  // Minimum swipe distance to register as swipe
  const minSwipeDistance = 50;
  
  const popularityColors: Record<string, string> = {
    'Hot': 'bg-gaming-pink text-white',
    'Trending': 'bg-gaming-purple text-white',
    'Popular': 'bg-gaming-blue text-white',
    'New': 'bg-gaming-accent text-gaming-dark',
    'Editor\'s Choice': 'bg-[#FF69B4] text-white',
    'Top Rated': 'bg-[#FF69B4] text-white',
    'Free': 'bg-black/80 text-white'
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(false);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    
    // If the touch has moved more than a small threshold, consider it a swipe
    if (touchStart && Math.abs(touchStart - e.targetTouches[0].clientX) > 10) {
      setIsSwiping(true);
    }
  };
  
  const handleTouchEnd = () => {
    // Slight delay to allow for tapping the button, but only if not swiping
    if (!isSwiping) {
      setTimeout(() => setIsHovered(false), 500);
    } else {
      setIsHovered(false);
    }
    
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
    
    // Reset swiping state
    setIsSwiping(false);
  };

  // Prevent default behavior for touch events to avoid page scrolling during swipe
  useEffect(() => {
    const card = cardRef.current;
    
    const preventDefaultTouch = (e: TouchEvent) => {
      if (isSwiping) {
        e.preventDefault();
      }
    };
    
    if (card) {
      card.addEventListener('touchmove', preventDefaultTouch, { passive: false });
    }
    
    return () => {
      if (card) {
        card.removeEventListener('touchmove', preventDefaultTouch);
      }
    };
  }, [isSwiping]);

  return (
    <a 
      ref={cardRef}
      href={isSwiping ? undefined : (link || "#")}
      className={cn(
        "glass-panel transition-all duration-300 border border-white/5 rounded-2xl overflow-hidden block max-w-[320px] shadow-lg",
        isHovered && "neon-border shadow-neon-glow"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => {
        if (isSwiping) {
          e.preventDefault();
        }
      }}
    >
      <div className="relative">
        {/* Main image area */}
        <div className="h-64 overflow-hidden">
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
              <Download size={20} className="mr-2" />
              Play Now
            </button>
          </div>
        </div>
        
        {/* Multiple badges positioned at the top */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-2">
          {/* Can display multiple badges */}
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
        
        {/* Free badge */}
        <div className="absolute top-2 right-2">
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${popularityColors['Free']}`}>
            Free
          </div>
        </div>
        
        {/* Swipe indicators */}
        <div className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 rounded-full p-2 text-white cursor-pointer opacity-0 transition-opacity ${isHovered ? 'opacity-70 hover:opacity-100' : ''}`}>
          <ChevronLeft size={24} />
        </div>
        <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 rounded-full p-2 text-white cursor-pointer opacity-0 transition-opacity ${isHovered ? 'opacity-70 hover:opacity-100' : ''}`}>
          <ChevronRight size={24} />
        </div>
      </div>
      
      {/* Content area at the bottom */}
      <div className="p-4">
        {/* Star rating and number */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Star size={18} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white ml-1 font-bold">{rating}</span>
          </div>
          <div className="flex items-center">
            <Star size={18} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white ml-1 font-bold">4.8</span>
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
        
        {/* Download button */}
        <button className="w-full bg-[#FF69B4] hover:bg-gaming-purple text-white font-display font-bold py-3 rounded-full flex items-center justify-center transition-all duration-300">
          Download Now
        </button>
      </div>
    </a>
  );
};

export default MistplayGameCard;
