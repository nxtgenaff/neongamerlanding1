import { useState, useEffect, useRef } from 'react';
import { Trophy, Gamepad, Diamond, ArrowRight, Star, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';
import RewardCard from '../components/RewardCard';
import TestimonialCard from '../components/TestimonialCard';
import GamingForm from '../components/GamingForm';
import MistplayGameCard from '../components/MistplayGameCard';

const Index = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [recentWinner, setRecentWinner] = useState({
    name: '',
    prize: ''
  });
  const [showWinner, setShowWinner] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const visibleCards = 4;
  const isTouchDragging = useRef(false);
  const startDragX = useRef(0);
  const currentTranslateX = useRef(0);
  const previousTranslateX = useRef(0);

  useEffect(() => {
    const bannerTimer = setTimeout(() => {
      setShowBanner(true);
    }, 3000);
    const winners = [{
      name: 'Alex89',
      prize: '5000 Units'
    }, {
      name: 'GamerQueen',
      prize: '$15 Amazon Gift Card'
    }, {
      name: 'FrostySniper',
      prize: '$25 PayPal Credit'
    }, {
      name: 'EliteGamer22',
      prize: '10000 Units'
    }];
    const winnerInterval = setInterval(() => {
      if (Date.now() - pageLoadTime > 5000) {
        const randomWinner = winners[Math.floor(Math.random() * winners.length)];
        setRecentWinner(randomWinner);
        setShowWinner(true);
        setTimeout(() => {
          setShowWinner(false);
        }, 4000);
      }
    }, 15000);
    const pageLoadTime = Date.now();
    return () => {
      clearTimeout(bannerTimer);
      clearInterval(winnerInterval);
    };
  }, []);

  const rewards = [{
    title: "Gift Cards",
    description: "Convert your Mistplay Units to gift cards from Amazon, Google Play, and more.",
    image: "/lovable-uploads/b88d5754-2c2b-4140-8f36-00efa0377ad4.png",
    glowColor: "blue" as const
  }, {
    title: "PayPal Cash",
    description: "Turn your gaming sessions into real money sent directly to your PayPal account.",
    image: "/lovable-uploads/427dfe4c-e058-4d37-bb8d-ab6e3cddb7f2.png",
    glowColor: "purple" as const
  }, {
    title: "Premium Units",
    description: "Earn bonus Units with special offers and promotions for faster rewards.",
    image: "/lovable-uploads/ea4be6c1-93b5-4369-b924-69575ff3ee09.png",
    glowColor: "pink" as const
  }];

  const testimonials = [{
    name: "Michael R.",
    game: "Coin Master Player",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "I've earned over $50 in Amazon gift cards just playing games I actually enjoy!",
    stars: 5
  }, {
    name: "Sarah K.",
    game: "Bingo Blitz Player",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "Mistplay is legit! Got my first PayPal cash out within two weeks of playing.",
    stars: 5
  }, {
    name: "Jason T.",
    game: "Rise of Kingdoms Player",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    quote: "I play games anyway, so getting rewarded for it is an awesome bonus!",
    stars: 4
  }];

  const mistplayGames = [{
    title: "Coin Master",
    genre: "Casual",
    points: 4500,
    image: "/lovable-uploads/7db38f96-9357-40e1-8f04-2432bfa1ddc6.png",
    popularity: "Editor's Choice" as const,
    description: "Join the adventure with the cutest pig thief in this addictive simulation game. Collect coins...",
    downloads: "100M+",
    rating: 4.5,
    link: "https://areyourealhuman.com/cl/i/6d4ow7"
  }, {
    title: "Rise of Kingdoms",
    genre: "Strategy",
    points: 5200,
    image: "/lovable-uploads/e4dffdcd-eb70-400b-bcd4-90d266036b06.png",
    popularity: "Top Rated" as const,
    description: "Build your civilization and conquer the world in this epic strategy game with millions of players.",
    downloads: "50M+",
    rating: 4.8,
    link: "https://areyourealhuman.com/cl/i/6d4ow7"
  }, {
    title: "Bingo Blitz",
    genre: "Casino",
    points: 3800,
    image: "/lovable-uploads/8e0765fb-cde1-40da-b755-5ed145f143cf.png",
    popularity: "Popular" as const,
    description: "Play the #1 free bingo game on mobile with exciting mini-games and social features.",
    downloads: "10M+",
    rating: 4.6,
    link: "https://areyourealhuman.com/cl/i/6d4ow7"
  }, {
    title: "Evony",
    genre: "Strategy",
    points: 6000,
    image: "/lovable-uploads/b07ac3a2-04de-4724-888d-561f3f91143a.png",
    popularity: "Hot" as const,
    description: "Build your city, train your army, and conquer the Seven Kingdoms in this multiplayer strategy game.",
    downloads: "5M+",
    rating: 4.7,
    link: "https://areyourealhuman.com/cl/i/6d4ow7"
  }, {
    title: "Piggy GO",
    genre: "Casual",
    points: 4200,
    image: "/lovable-uploads/14fd3156-196d-459b-b5bf-48ffe3e93869.png",
    popularity: "Top Rated" as const,
    description: "Roll the dice, build and upgrade islands, collect piggies and attack your friends' boards!",
    downloads: "50M+",
    rating: 4.8,
    link: "https://areyourealhuman.com/cl/i/6d4ow7"
  }];

  const nextCard = () => {
    if (currentCardIndex < mistplayGames.length - visibleCards) {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  const handleCarouselTouchStart = (e: React.TouchEvent) => {
    if (!carouselWrapperRef.current) return;
    
    isTouchDragging.current = true;
    startDragX.current = e.touches[0].clientX;
    previousTranslateX.current = currentCardIndex * -(100 / visibleCards);
    currentTranslateX.current = previousTranslateX.current;
    
    // Stop any ongoing animation
    if (carouselWrapperRef.current) {
      carouselWrapperRef.current.style.transition = 'none';
    }
    
    e.stopPropagation();
  };
  
  const handleCarouselTouchMove = (e: React.TouchEvent) => {
    if (!isTouchDragging.current || !carouselWrapperRef.current) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startDragX.current;
    const maxMove = 100 / visibleCards; // Maximum percentage to move per card
    
    // Calculate new position with resistance at the edges
    let newTranslateX;
    if (currentCardIndex <= 0 && diff > 0) {
      // Add resistance when trying to swipe right at the beginning
      newTranslateX = previousTranslateX.current + (diff / 3) / carouselRef.current!.clientWidth * 100;
    } else if (currentCardIndex >= mistplayGames.length - visibleCards && diff < 0) {
      // Add resistance when trying to swipe left at the end
      newTranslateX = previousTranslateX.current + (diff / 3) / carouselRef.current!.clientWidth * 100;
    } else {
      // Normal movement
      newTranslateX = previousTranslateX.current + diff / carouselRef.current!.clientWidth * 100;
    }
    
    currentTranslateX.current = newTranslateX;
    
    // Apply the translation
    carouselWrapperRef.current.style.transform = `translateX(${newTranslateX}%)`;
    
    e.stopPropagation();
    e.preventDefault();
  };
  
  const handleCarouselTouchEnd = (e: React.TouchEvent) => {
    if (!isTouchDragging.current || !carouselWrapperRef.current) return;
    
    // Re-enable transitions
    if (carouselWrapperRef.current) {
      carouselWrapperRef.current.style.transition = 'transform 300ms ease-out';
    }
    
    // Calculate the new index based on the drag distance
    const dragDistance = startDragX.current - e.changedTouches[0].clientX;
    const cardThreshold = 30; // Adjust this threshold for sensitivity
    
    let newIndex = currentCardIndex;
    
    if (Math.abs(dragDistance) > cardThreshold) {
      if (dragDistance > 0 && currentCardIndex < mistplayGames.length - visibleCards) {
        // Dragged left - go to next card
        newIndex = currentCardIndex + 1;
      } else if (dragDistance < 0 && currentCardIndex > 0) {
        // Dragged right - go to previous card
        newIndex = currentCardIndex - 1;
      }
    }
    
    // Update the current index
    setCurrentCardIndex(newIndex);
    
    // Snap back to grid
    const newTranslateX = newIndex * -(100 / visibleCards);
    if (carouselWrapperRef.current) {
      carouselWrapperRef.current.style.transform = `translateX(${newTranslateX}%)`;
    }
    
    // Reset the drag state
    isTouchDragging.current = false;
    
    e.stopPropagation();
  };

  return <div className="min-h-screen bg-gaming-dark overflow-hidden">
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 py-16 md:py-20 bg-hero-pattern">
        <div className="absolute inset-0 bg-gaming-dark/30 backdrop-blur-[2px]"></div>
        
        <div className="container max-w-6xl mx-auto z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-left" data-aos="fade-right">
              <div className="inline-block px-4 py-1 mb-4 rounded-full bg-gaming-blue/10 border border-gaming-blue/20">
                <p className="text-gaming-blue text-sm font-medium flex items-center">
                  <Trophy size={14} className="mr-1" /> Mistplay: Play & Earn
                </p>
              </div>
              
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-white tracking-tight">
                Get <span className="neon-text">Paid to Play</span> Your Favorite Mobile Games!
              </h1>
              
              <p className="text-base md:text-lg text-white/80 mb-6 md:mb-8 max-w-xl">
                Turn your gaming time into real rewards! Earn Units as you play and redeem them for gift cards, PayPal cash, and more.
              </p>
              
              <div className="mb-6">
                <CountdownTimer hours={23} minutes={59} seconds={59} />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://areyourealhuman.com/cl/i/6d4ow7" className="cta-btn touch-target">
                  START EARNING NOW <ArrowRight size={16} className="ml-2" />
                </a>
                <a href="#games" className="gaming-btn-outline touch-target">
                  VIEW GAMES
                </a>
              </div>
            </div>
            
            <div className="relative mt-8 md:mt-0 hidden md:block" data-aos="fade-left">
              <div className="glass-panel p-4 sm:p-6 md:p-8 relative border border-white/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-neon-border animate-gradient-flow"></div>
                <div className="flex items-center mb-6">
                  <Gamepad size={28} className="text-gaming-blue mr-3" />
                  <h3 className="font-display text-xl font-bold">Mistplay Rewards</h3>
                </div>
                
                <div className="relative h-64 md:h-80 mb-4 overflow-hidden rounded-lg">
                  <img src="/lovable-uploads/9d8e7357-5583-43f6-9e69-102cf9265fef.png" alt="Mistplay Rewards" className="object-cover w-full h-full transition-transform duration-700 ease-in-out hover:scale-105" />
                </div>
                
                <div className="flex items-center justify-between bg-gaming-darker p-3 rounded-lg">
                  <div className="flex items-center">
                    <Diamond size={18} className="text-gaming-accent mr-2" />
                    <span className="text-sm font-medium">Average Monthly Earnings</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-bold text-gaming-accent">$15-25</span>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-white/50 mb-2">New users joining today</p>
                  <div className="w-full bg-gaming-darker rounded-full h-2">
                    <div className="bg-gaming-blue h-2 rounded-full w-[78%]"></div>
                  </div>
                  <p className="text-xs text-white/70 mt-2">Registration bonus available! <span className="text-gaming-pink">+500 Units</span></p>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gaming-blue/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gaming-purple/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          
          
        </div>
      </section>
      
      <section id="games" className="py-20 relative">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-gaming-blue/10 border border-gaming-blue/20">
              <p className="text-gaming-blue text-sm font-medium flex items-center justify-center">
                <Gamepad size={14} className="mr-1" /> Featured Mistplay Games
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Play These <span className="neon-text">Top Games</span> to Earn More
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              The more you play, the more you earn. Check out these high-earning games on Mistplay
            </p>
          </div>
          
          <div className="relative">
            <button 
              onClick={prevCard}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gaming-purple/80 rounded-full p-2 md:p-3 text-white ${currentCardIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
              disabled={currentCardIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextCard}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gaming-purple/80 rounded-full p-2 md:p-3 text-white ${currentCardIndex >= mistplayGames.length - visibleCards ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
              disabled={currentCardIndex >= mistplayGames.length - visibleCards}
            >
              <ChevronRight size={24} />
            </button>
            
            <div 
              ref={carouselRef}
              className="overflow-hidden px-4 py-2 touch-pan-y"
              onTouchStart={handleCarouselTouchStart}
              onTouchMove={handleCarouselTouchMove}
              onTouchEnd={handleCarouselTouchEnd}
              style={{ touchAction: 'pan-y' }}
            >
              <div 
                ref={carouselWrapperRef}
                className="flex gap-6 transition-transform duration-300 ease-out will-change-transform"
                style={{ 
                  transform: `translateX(-${currentCardIndex * (100 / visibleCards)}%)`,
                  width: `${(mistplayGames.length / visibleCards) * 100}%`
                }}
              >
                {mistplayGames.map((game, index) => (
                  <div key={index} className="flex-1 min-w-[260px] sm:min-w-[280px] md:min-w-[300px] flex justify-center">
                    <MistplayGameCard 
                      title={game.title} 
                      genre={game.genre} 
                      points={game.points} 
                      image={game.image} 
                      popularity={game.popularity} 
                      description={game.description}
                      downloads={game.downloads}
                      rating={game.rating}
                      link={game.link}
                      onSwipeLeft={nextCard}
                      onSwipeRight={prevCard}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: Math.ceil(mistplayGames.length - visibleCards + 1) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCardIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentCardIndex === index
                      ? 'bg-gaming-pink'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-white/70 mb-6">
              Download Mistplay to see hundreds more games and start earning today!
            </p>
            <a href="https://areyourealhuman.com/cl/i/6d4ow7" className="cta-btn">
              GET STARTED NOW <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
        
        <div className="absolute top-40 -left-40 w-80 h-80 bg-gaming-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 -right-40 w-80 h-80 bg-gaming-purple/5 rounded-full blur-3xl"></div>
      </section>
      
      <section id="rewards" className="py-20 relative">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-gaming-blue/10 border border-gaming-blue/20">
              <p className="text-gaming-blue text-sm font-medium flex items-center justify-center">
                <Star size={14} className="mr-1" /> Mistplay Rewards
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Redeem Your <span className="neon-text">Units</span> for Real Rewards
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Convert the Units you earn through gameplay into valuable rewards you'll actually use
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {rewards.map((reward, index) => <RewardCard key={index} title={reward.title} description={reward.description} image={reward.image} glowColor={reward.glowColor} />)}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-white/70 mb-6">
              The more you play, the more you earn. Join millions of gamers earning rewards!
            </p>
            <a href="https://areyourealhuman.com/cl/i/6d4ow7" className="cta-btn">
              START EARNING NOW <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
        
        <div className="absolute top-40 -left-40 w-80 h-80 bg-gaming-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 -right-40 w-80 h-80 bg-gaming-purple/5 rounded-full blur-3xl"></div>
      </section>
      
      <section className="py-20 bg-gaming-darker relative clip-path-slant">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Trusted by <span className="neon-text">Gamers</span> Worldwide
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Join millions of satisfied Mistplay users already earning rewards
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <TestimonialCard key={index} name={testimonial.name} game={testimonial.game} avatar={testimonial.avatar} quote={testimonial.quote} stars={testimonial.stars} />)}
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mt-16">
            <div className="glass-panel px-5 py-3 flex items-center">
              <div className="mr-3 text-2xl font-display font-bold text-gaming-blue">15M+</div>
              <div className="text-sm text-white/70">Active Users</div>
            </div>
            <div className="glass-panel px-5 py-3 flex items-center">
              <div className="mr-3 text-2xl font-display font-bold text-gaming-purple">4.4</div>
              <div className="text-sm text-white/70">App Store Rating</div>
            </div>
            <div className="glass-panel px-5 py-3 flex items-center">
              <div className="mr-3 text-2xl font-display font-bold text-gaming-pink">$15M+</div>
              <div className="text-sm text-white/70">Rewards Given</div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="claim-form" className="py-16 md:py-20 relative clip-path-slant-reverse">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              Start <span className="neon-text">Earning Rewards</span> Today
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
              Sign up now and get 500 bonus Units when you download the Mistplay app and play your first game
            </p>
            
            <div className="mt-4 md:mt-6 mb-6 md:mb-10">
              <CountdownTimer hours={23} minutes={59} seconds={59} />
            </div>
          </div>
          
          <GamingForm />
          
          <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="glass-panel p-3 md:p-4 flex items-center justify-center border border-white/5">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Former_Visa_%28company%29_logo.svg/2560px-Former_Visa_%28company%29_logo.svg.png" alt="Visa" className="h-5 md:h-6 opacity-70" loading="lazy" />
            </div>
            <div className="glass-panel p-3 md:p-4 flex items-center justify-center border border-white/5">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-5 md:h-6 opacity-70" loading="lazy" />
            </div>
            <div className="glass-panel p-3 md:p-4 flex items-center justify-center border border-white/5">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" alt="PayPal" className="h-5 md:h-6 opacity-70" loading="lazy" />
            </div>
            <div className="glass-panel p-3 md:p-4 flex items-center justify-center border border-white/5">
              <div className="text-xs text-white/50 flex items-center">
                <Shield size={14} className="mr-1" />
                Secure & Encrypted
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-40 -right-40 w-80 h-80 bg-gaming-pink/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 -left-40 w-80 h-80 bg-gaming-blue/5 rounded-full blur-3xl"></div>
      </section>
      
      <footer className="py-8 md:py-10 border-t border-white/5">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="font-display text-xl font-bold text-white">
                Mist<span className="text-gaming-blue">play</span>
              </h3>
              <p className="text-sm text-white/50 mt-1">
                Play games. Earn rewards.
              </p>
            </div>
            
            <div className="text-sm text-white/50">
              © {new Date().getFullYear()} Mistplay. All rights reserved.
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5 text-xs text-white/40 text-center">
            <p>Actual rewards may vary. Earning rates depend on gameplay and availability in your region.</p>
          </div>
        </div>
      </footer>
      
      {showWinner && <div className="fixed bottom-5 left-5 glass-panel p-4 animate-fade-in z-50 max-w-xs border border-gaming-blue/20 shadow-neon-blue">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gaming-blue/20 rounded-full flex items-center justify-center mr-3">
              <Trophy size={20} className="text-gaming-blue" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{recentWinner.name} just redeemed:</p>
              <p className="text-xs text-gaming-blue">{recentWinner.prize}</p>
            </div>
          </div>
        </div>}
      
      {showBanner && <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-gaming-blue to-gaming-purple py-2 px-4 z-50 flex items-center justify-center">
          <p className="text-sm text-black font-medium">
            🔥 New User Bonus! Register today for 500 extra Units!
          </p>
          <button onClick={() => setShowBanner(false)} className="ml-4 text-black/70 hover:text-black">
            ✕
          </button>
        </div>}
      
      <div className="sticky-cta">
        <a href="https://areyourealhuman.com/cl/i/6d4ow7" className="cta-btn w-full text-sm">
          START EARNING NOW <ArrowRight size={16} className="ml-2" />
        </a>
      </div>
    </div>;
};
export default Index;
