
import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]
type CustomCarouselProps = {
  autoPlay?: boolean
  autoPlayInterval?: number
  stacked?: boolean
}

export interface CarouselProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CustomCarouselProps {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof React.useRef<HTMLDivElement>>
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  selectedIndex: number
  slidesCount: number
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      autoPlay = false,
      autoPlayInterval = 3000,
      stacked = false,
      ...props
    },
    ref
  ) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [slidesCount, setSlidesCount] = React.useState(0)
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)
    
    const containerRef = React.useRef<HTMLDivElement>(null)
    const carouselRef = React.useRef<HTMLDivElement>(null)

    const [emblaRef, emblaApi] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )

    const scrollPrev = React.useCallback(() => {
      emblaApi?.scrollPrev()
    }, [emblaApi])

    const scrollNext = React.useCallback(() => {
      emblaApi?.scrollNext()
    }, [emblaApi])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    // Add auto-play functionality
    React.useEffect(() => {
      if (autoPlay && emblaApi) {
        const interval = setInterval(() => {
          if (!emblaApi.canScrollNext()) {
            emblaApi.scrollTo(0)
          } else {
            emblaApi.scrollNext()
          }
        }, autoPlayInterval)

        return () => clearInterval(interval)
      }
    }, [autoPlay, autoPlayInterval, emblaApi])

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return

      setSelectedIndex(api.selectedScrollSnap())
      setSlidesCount(api.scrollSnapList().length)
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    React.useEffect(() => {
      if (!emblaApi) return

      onSelect(emblaApi)
      emblaApi.on("reInit", onSelect)
      emblaApi.on("select", onSelect)

      // Add/remove 'is-prev' and 'is-next' classes for stacked effect
      if (stacked && emblaApi) {
        const slides = emblaApi.slideNodes()
        const applyStackedClasses = () => {
          const currentIndex = emblaApi.selectedScrollSnap()
          
          slides.forEach((slide, index) => {
            slide.classList.remove('is-current', 'is-prev', 'is-next')
            
            if (index === currentIndex) {
              slide.classList.add('is-current')
            } else if (index === currentIndex - 1 || (currentIndex === 0 && index === slides.length - 1)) {
              slide.classList.add('is-prev')
            } else if (index === currentIndex + 1 || (currentIndex === slides.length - 1 && index === 0)) {
              slide.classList.add('is-next')
            }
          })
        }
        
        applyStackedClasses()
        emblaApi.on("select", applyStackedClasses)
        emblaApi.on("reInit", applyStackedClasses)
      }

      if (setApi) {
        setApi(emblaApi)
      }

    }, [emblaApi, setApi, onSelect, stacked])

    React.useEffect(() => {
      if (containerRef.current) {
        const containerElement = containerRef.current
        containerElement.classList.toggle('cards-swipe-container', stacked)
      }
    }, [stacked])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: emblaApi,
          opts,
          orientation: orientation || "horizontal",
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          selectedIndex,
          slidesCount,
          stacked
        }}
      >
        <div
          ref={containerRef}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          <div
            ref={ref}
            onKeyDownCapture={handleKeyDown}
            className="overflow-hidden"
          >
            <div ref={emblaRef} className="flex">
              {children}
            </div>
          </div>
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      className={cn(
        "flex",
        orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
        className
      )}
      {...props}
    />
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

const CarouselDots = () => {
  const { api, selectedIndex, slidesCount } = useCarousel()

  if (!api || slidesCount <= 1) return null

  return (
    <div className="flex justify-center gap-1 mt-2">
      {Array.from({ length: slidesCount }).map((_, index) => (
        <button
          key={index}
          className={`w-2 h-2 rounded-full transition-all ${
            selectedIndex === index 
              ? 'bg-white scale-125' 
              : 'bg-white/30'
          }`}
          onClick={() => api.scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}
CarouselDots.displayName = "CarouselDots"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  type CarouselApi,
}
