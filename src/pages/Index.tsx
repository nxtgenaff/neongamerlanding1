
import { useState, useEffect } from 'react';
import { Trophy, Gamepad, Diamond, ArrowRight, Star, Shield } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';
import RewardCard from '../components/RewardCard';
import TestimonialCard from '../components/TestimonialCard';
import GamingForm from '../components/GamingForm';
import MistplayGameCard from '../components/MistplayGameCard';

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
      { name: 'Alex89', prize: '5000 Units' },
      { name: 'GamerQueen', prize: '$15 Amazon Gift Card' },
      { name: 'FrostySniper', prize: '$25 PayPal Credit' },
      { name: 'EliteGamer22', prize: '10000 Units' }
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
      title: "Gift Cards",
      description: "Convert your Mistplay Units to gift cards from Amazon, Google Play, and more.",
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=800&q=80",
      glowColor: "blue" as const
    },
    {
      title: "PayPal Cash",
      description: "Turn your gaming sessions into real money sent directly to your PayPal account.",
      image: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?auto=format&fit=crop&w=800&q=80",
      glowColor: "purple" as const
    },
    {
      title: "Premium Units",
      description: "Earn bonus Units with special offers and promotions for faster rewards.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80", 
      glowColor: "pink" as const
    }
  ];

  const testimonials = [
    {
      name: "Michael R.",
      game: "Coin Master Player",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "I've earned over $50 in Amazon gift cards just playing games I actually enjoy!",
      stars: 5
    },
    {
      name: "Sarah K.",
      game: "Bingo Blitz Player",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "Mistplay is legit! Got my first PayPal cash out within two weeks of playing.",
      stars: 5
    },
    {
      name: "Jason T.",
      game: "Rise of Kingdoms Player",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      quote: "I play games anyway, so getting rewarded for it is an awesome bonus!",
      stars: 4
    }
  ];

  const mistplayGames = [
    {
      title: "Coin Master",
      genre: "Casual",
      points: 4500,
      image: "https://images.unsplash.com/photo-1604326531570-2689ea7ae287?auto=format&fit=crop&w=800&q=80",
      popularity: "Hot"
    },
    {
      title: "Rise of Kingdoms",
      genre: "Strategy",
      points: 5200,
      image: "https://images.unsplash.com/photo-1499551660540-eaf0697882f5?auto=format&fit=crop&w=800&q=80",
      popularity: "Trending"
    },
    {
      title: "Bingo Blitz",
      genre: "Casino",
      points: 3800,
      image: "https://images.unsplash.com/photo-1611323643310-ef21e38ac9db?auto=format&fit=crop&w=800&q=80",
      popularity: "Popular"
    },
    {
      title: "Evony",
      genre: "Strategy",
      points: 6000,
      image: "https://images.unsplash.com/photo-1551009175-15bdf9dcb580?auto=format&fit=crop&w=800&q=80",
      popularity: "Hot"
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
                  <Trophy size={14} className="mr-1" /> Mistplay: Play & Earn
                </p>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white tracking-tight">
                Get <span className="neon-text">Paid to Play</span> Your Favorite Mobile Games!
              </h1>
              
              <p className="text-lg text-white/80 mb-8 max-w-xl">
                Turn your gaming time into real rewards! Earn Units as you play and redeem them for gift cards, PayPal cash, and more.
              </p>
              
              <div className="mb-6">
                <CountdownTimer hours={23} minutes={59} seconds={59} />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#claim-form" className="cta-btn">
                  START EARNING NOW <ArrowRight size={16} className="ml-2" />
                </a>
                <a href="#games" className="gaming-btn-outline">
                  VIEW GAMES
                </a>
              </div>
            </div>
            
            <div className="relative" data-aos="fade-left">
              <div className="glass-panel p-6 md:p-8 relative border border-white/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-neon-border animate-gradient-flow"></div>
                <div className="flex items-center mb-6">
                  <Gamepad size={28} className="text-gaming-blue mr-3" />
                  <h3 className="font-display text-xl font-bold">Mistplay Rewards</h3>
                </div>
                
                <div className="relative h-64 md:h-80 mb-4 overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80" 
                    alt="Mistplay Rewards" 
                    className="object-cover w-full h-full transition-transform duration-700 ease-in-out hover:scale-105"
                  />
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
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-white/50 text-sm mb-2">Scroll to see games</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>
      
      {/* Games Section */}
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
          
          <div className="grid md:grid-cols-4 gap-6">
            {mistplayGames.map((game, index) => (
              <MistplayGameCard 
                key={index}
                title={game.title}
                genre={game.genre}
                points={game.points}
                image={game.image}
                popularity={game.popularity}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-white/70 mb-6">
              Download Mistplay to see hundreds more games and start earning today!
            </p>
            <a href="#claim-form" className="cta-btn">
              GET STARTED NOW <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
        
        <div className="absolute top-40 -left-40 w-80 h-80 bg-gaming-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 -right-40 w-80 h-80 bg-gaming-purple/5 rounded-full blur-3xl"></div>
      </section>
      
      {/* Rewards Section */}
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
              The more you play, the more you earn. Join millions of gamers earning rewards!
            </p>
            <a href="#claim-form" className="cta-btn">
              START EARNING NOW <ArrowRight size={16} className="ml-2" />
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
              Join millions of satisfied Mistplay users already earning rewards
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
      
      {/* Form Section */}
      <section id="claim-form" className="py-20 relative clip-path-slant-reverse">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Start <span className="neon-text">Earning Rewards</span> Today
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Sign up now and get 500 bonus Units when you download the Mistplay app and play your first game
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
      
      {/* Recent Winner Notification */}
      {showWinner && (
        <div className="fixed bottom-5 left-5 glass-panel p-4 animate-fade-in z-50 max-w-xs border border-gaming-blue/20 shadow-neon-blue">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gaming-blue/20 rounded-full flex items-center justify-center mr-3">
              <Trophy size={20} className="text-gaming-blue" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{recentWinner.name} just redeemed:</p>
              <p className="text-xs text-gaming-blue">{recentWinner.prize}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Limited Time Banner */}
      {showBanner && (
        <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-gaming-blue to-gaming-purple py-2 px-4 z-50 flex items-center justify-center">
          <p className="text-sm text-black font-medium">
            🔥 New User Bonus! Register today for 500 extra Units!
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
