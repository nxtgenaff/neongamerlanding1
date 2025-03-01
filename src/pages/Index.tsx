
import { useState, useEffect } from 'react';
import { Trophy, Gamepad, Diamond, ArrowRight, Star, Shield } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';
import RewardCard from '../components/RewardCard';
import TestimonialCard from '../components/TestimonialCard';
import GamingForm from '../components/GamingForm';

const Index = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [recentWinner, setRecentWinner] = useState({ name: '', prize: '' });
  const [showWinner, setShowWinner] = useState(false);

  useEffect(() => {
    // Show the banner after 3 seconds
    const bannerTimer = setTimeout(() => {
      setShowBanner(true);
    }, 3000);

    // Show winners notification at random intervals
    const winners = [
      { name: 'Alex89', prize: 'Legendary Skin' },
      { name: 'GamerQueen', prize: '5000 Coins' },
      { name: 'FrostySniper', prize: 'Rare Weapon' },
      { name: 'EliteGamer22', prize: 'Season Pass' }
    ];

    const winnerInterval = setInterval(() => {
      // Only show if user has been on page for more than 5 seconds
      if (Date.now() - pageLoadTime > 5000) {
        const randomWinner = winners[Math.floor(Math.random() * winners.length)];
        setRecentWinner(randomWinner);
        setShowWinner(true);

        // Hide winner notification after 4 seconds
        setTimeout(() => {
          setShowWinner(false);
        }, 4000);
      }
    }, 15000); // Show a winner every 15 seconds

    const pageLoadTime = Date.now();

    return () => {
      clearTimeout(bannerTimer);
      clearInterval(winnerInterval);
    };
  }, []);

  const rewards = [
    {
      title: "Exclusive Skins",
      description: "Customize your character with rare skins not available in the store.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      glowColor: "blue" as const
    },
    {
      title: "5000+ Game Coins",
      description: "Get a massive boost with in-game currency to purchase premium items.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      glowColor: "purple" as const
    },
    {
      title: "Power-Up Bundle",
      description: "Unlock special abilities and power-ups to dominate your opponents.",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=800&q=80", 
      glowColor: "pink" as const
    }
  ];

  const testimonials = [
    {
      name: "Michael R.",
      game: "Battle Royale Pro",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "The exclusive skin pack was insane! My character stands out in every match now!",
      stars: 5
    },
    {
      name: "Sarah K.",
      game: "Legendary MMORPG Player",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "Got the coin bundle instantly. Was able to buy that legendary mount I've been saving for.",
      stars: 5
    },
    {
      name: "Jason T.",
      game: "FPS Champion",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      quote: "The power-ups gave me a serious edge in ranked matches. Totally worth it!",
      stars: 4
    }
  ];

  return (
    <div className="min-h-screen bg-gaming-dark overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 py-20 bg-hero-pattern">
        <div className="absolute inset-0 bg-gaming-dark/30 backdrop-blur-[2px]"></div>
        
        <div className="container max-w-6xl mx-auto z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left" data-aos="fade-right">
              <div className="inline-block px-4 py-1 mb-4 rounded-full bg-gaming-blue/10 border border-gaming-blue/20">
                <p className="text-gaming-blue text-sm font-medium flex items-center">
                  <Trophy size={14} className="mr-1" /> Limited Time Gaming Offer
                </p>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white tracking-tight">
                Claim Your <span className="neon-text">Free In-Game Rewards</span> Now!
              </h1>
              
              <p className="text-lg text-white/80 mb-8 max-w-xl">
                Unlock exclusive skins, coins, and power-ups that will give you the competitive edge in just a few steps!
              </p>
              
              <div className="mb-6">
                <CountdownTimer hours={23} minutes={59} seconds={59} />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#claim-form" className="cta-btn">
                  GET STARTED NOW <ArrowRight size={16} className="ml-2" />
                </a>
                <a href="#rewards" className="gaming-btn-outline">
                  VIEW REWARDS
                </a>
              </div>
            </div>
            
            <div className="relative" data-aos="fade-left">
              <div className="glass-panel p-6 md:p-8 relative border border-white/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-neon-border animate-gradient-flow"></div>
                <div className="flex items-center mb-6">
                  <Gamepad size={28} className="text-gaming-blue mr-3" />
                  <h3 className="font-display text-xl font-bold">Game Rewards Showcase</h3>
                </div>
                
                <div className="relative h-64 md:h-80 mb-4 overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80" 
                    alt="Gaming Rewards" 
                    className="object-cover w-full h-full transition-transform duration-700 ease-in-out hover:scale-105"
                  />
                </div>
                
                <div className="flex items-center justify-between bg-gaming-darker p-3 rounded-lg">
                  <div className="flex items-center">
                    <Diamond size={18} className="text-gaming-accent mr-2" />
                    <span className="text-sm font-medium">Premium Rewards Pack</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm line-through text-white/40 mr-2">$49.99</span>
                    <span className="text-sm font-bold text-gaming-accent">FREE</span>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-white/50 mb-2">Players claiming rewards today</p>
                  <div className="w-full bg-gaming-darker rounded-full h-2">
                    <div className="bg-gaming-blue h-2 rounded-full w-[78%]"></div>
                  </div>
                  <p className="text-xs text-white/70 mt-2">Limited slots remaining! <span className="text-gaming-pink">87% claimed</span></p>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gaming-blue/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gaming-purple/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-white/50 text-sm mb-2">Scroll to see rewards</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>
      
      {/* Rewards Section */}
      <section id="rewards" className="py-20 relative">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-gaming-blue/10 border border-gaming-blue/20">
              <p className="text-gaming-blue text-sm font-medium flex items-center justify-center">
                <Star size={14} className="mr-1" /> Exclusive Gaming Rewards
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Unlock These <span className="neon-text">Epic Rewards</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Level up your gaming experience with these exclusive items that will give you the competitive edge
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {rewards.map((reward, index) => (
              <RewardCard 
                key={index}
                title={reward.title}
                description={reward.description}
                image={reward.image}
                glowColor={reward.glowColor}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-white/70 mb-6">
              Don't miss out on these limited-time offers! Claim your rewards now.
            </p>
            <a href="#claim-form" className="cta-btn">
              GET MY REWARDS NOW <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
        
        <div className="absolute top-40 -left-40 w-80 h-80 bg-gaming-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 -right-40 w-80 h-80 bg-gaming-purple/5 rounded-full blur-3xl"></div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gaming-darker relative clip-path-slant">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Trusted by <span className="neon-text">Gamers</span> Worldwide
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Join thousands of satisfied gamers who have already claimed their rewards
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                name={testimonial.name}
                game={testimonial.game}
                avatar={testimonial.avatar}
                quote={testimonial.quote}
                stars={testimonial.stars}
              />
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mt-16">
            <div className="glass-panel px-5 py-3 flex items-center">
              <div className="mr-3 text-2xl font-display font-bold text-gaming-blue">125K+</div>
              <div className="text-sm text-white/70">Happy Gamers</div>
            </div>
            <div className="glass-panel px-5 py-3 flex items-center">
              <div className="mr-3 text-2xl font-display font-bold text-gaming-purple">98%</div>
              <div className="text-sm text-white/70">Satisfaction Rate</div>
            </div>
            <div className="glass-panel px-5 py-3 flex items-center">
              <div className="mr-3 text-2xl font-display font-bold text-gaming-pink">4.9</div>
              <div className="text-sm text-white/70">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Form Section */}
      <section id="claim-form" className="py-20 relative clip-path-slant-reverse">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Claim Your <span className="neon-text">Free Rewards</span> Now
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Limited time offer! Enter your email below to receive your exclusive gaming rewards package
            </p>
            
            <div className="mt-6 mb-10">
              <CountdownTimer hours={23} minutes={59} seconds={59} />
            </div>
          </div>
          
          <GamingForm />
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-panel p-4 flex items-center justify-center border border-white/5">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Former_Visa_%28company%29_logo.svg/2560px-Former_Visa_%28company%29_logo.svg.png" alt="Visa" className="h-6 opacity-70" />
            </div>
            <div className="glass-panel p-4 flex items-center justify-center border border-white/5">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 opacity-70" />
            </div>
            <div className="glass-panel p-4 flex items-center justify-center border border-white/5">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" alt="PayPal" className="h-6 opacity-70" />
            </div>
            <div className="glass-panel p-4 flex items-center justify-center border border-white/5">
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
      
      {/* Footer */}
      <footer className="py-10 border-t border-white/5">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="font-display text-xl font-bold text-white">
                Gaming<span className="text-gaming-blue">Rewards</span>
              </h3>
              <p className="text-sm text-white/50 mt-1">
                Premium in-game rewards for serious gamers
              </p>
            </div>
            
            <div className="text-sm text-white/50">
              © {new Date().getFullYear()} Gaming Rewards. All rights reserved.
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5 text-xs text-white/40 text-center">
            <p>This is a promotional offer. Terms and conditions apply. Not affiliated with game publishers.</p>
          </div>
        </div>
      </footer>
      
      {/* Recent Winner Notification */}
      {showWinner && (
        <div className="fixed bottom-5 left-5 glass-panel p-4 animate-fade-in z-50 max-w-xs border border-gaming-blue/20 shadow-neon-blue">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gaming-blue/20 rounded-full flex items-center justify-center mr-3">
              <Trophy size={20} className="text-gaming-blue" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{recentWinner.name} just claimed:</p>
              <p className="text-xs text-gaming-blue">{recentWinner.prize}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Limited Time Banner */}
      {showBanner && (
        <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-gaming-blue to-gaming-purple py-2 px-4 z-50 flex items-center justify-center">
          <p className="text-sm text-black font-medium">
            🔥 Limited Time Offer! Claim your rewards in the next 24 hours!
          </p>
          <button 
            onClick={() => setShowBanner(false)} 
            className="ml-4 text-black/70 hover:text-black"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
