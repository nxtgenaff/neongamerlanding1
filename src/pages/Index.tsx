import { useState, useEffect } from 'react';
import { Trophy, Gamepad, Diamond, ArrowRight, Star, Shield } from 'lucide-react';
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
    popularity: "Hot" as const,
    link: "https://areyourealhuman.com/cl/i/6d4ow7"
  }, {
    title: "Rise of Kingdoms",
    genre: "Strategy",
    points: 5200,
    image: "/lovable-uploads/e4dffdcd-eb70-400b-bcd4-90d266036b06.png",
    popularity: "Trending" as const,
    link: "https://areyourealhuman.com/cl/i/6d4ow7"
  }, {
    title: "Bingo Blitz",
    genre: "Casino",
    points: 3800,
    image: "/lovable-uploads/8e0765fb-cde1-40da-b755-5ed145f143cf.png",
    popularity: "Popular" as const,
    link: "https://areyourealhuman.com/cl/i/6d4ow7"
  }, {
    title: "Evony",
    genre: "Strategy",
    points: 6000,
    image: "/lovable-uploads/b07ac3a2-04de-4724-888d-561f3f91143a.png",
    popularity: "Hot" as const,
    link: "https://areyourealhuman.com/cl/i/6d4ow7"
  }];
  return <div className="min-h-screen bg-gaming-dark overflow-hidden">
      
      
      <section id="games" className="py-20 relative">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Play These <span className="neon-text">Top Games</span> to Earn More
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              The more you play, the more you earn. Check out these high-earning games on Mistplay
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {mistplayGames.map((game, index) => <MistplayGameCard key={index} title={game.title} genre={game.genre} points={game.points} image={game.image} popularity={game.popularity} link={game.link} />)}
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
          <p className="text-sm text-black font-medium">🔥download the last trending mobile gmaes for free</p>
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