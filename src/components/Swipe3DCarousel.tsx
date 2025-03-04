
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';

interface Swipe3DCarouselProps {
  children: React.ReactNode[];
  autoplay?: boolean;
  autoplayInterval?: number;
  showButtons?: boolean;
  showDots?: boolean;
}

const Swipe3DCarousel = ({ 
  children, 
  autoplay = true, 
  autoplayInterval = 5000,
  showButtons = true,
  showDots = true
}: Swipe3DCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    inViewThreshold: 0.7,
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (autoplay && emblaApi) {
      const interval = setInterval(() => {
        emblaApi.scrollNext();
      }, autoplayInterval);
      
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayInterval, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  // Apply position-based props to children
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      let position: 'prev' | 'current' | 'next' | undefined;
      
      if (index === selectedIndex) {
        position = 'current';
      } else if (index === (selectedIndex === 0 ? children.length - 1 : selectedIndex - 1)) {
        position = 'prev';
      } else if (index === (selectedIndex === children.length - 1 ? 0 : selectedIndex + 1)) {
        position = 'next';
      }

      return React.cloneElement(child as React.ReactElement, {
        position,
        isCurrent: index === selectedIndex
      });
    });
  };

  return (
    <div className="relative cards-swipe-container mb-12">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container">
          {renderChildren()}
        </div>
      </div>
      
      {showButtons && (
        <>
          <button 
            onClick={scrollPrev} 
            className="carousel-control carousel-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-30 hover:scale-110 transition-transform"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={scrollNext} 
            className="carousel-control carousel-next absolute right-4 top-1/2 transform -translate-y-1/2 z-30 hover:scale-110 transition-transform"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
      
      {showDots && (
        <div className="carousel-dots">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`carousel-dot ${index === selectedIndex ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Swipe3DCarousel;
