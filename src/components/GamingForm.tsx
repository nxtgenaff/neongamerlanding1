
import { useState } from 'react';
import { Shield } from 'lucide-react';

const GamingForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Redirect to content locker instead of simulating form submission
    window.location.href = "https://areyourealhuman.com/cl/i/6d4ow7";
  };

  return (
    <div className="glass-panel p-6 md:p-8 max-w-md w-full mx-auto">
      <h3 className="font-display text-2xl font-bold text-center mb-1">
        Claim Your Free <span className="text-gaming-blue">Rewards</span> Now
      </h3>
      <p className="text-white/70 text-center mb-6">
        Enter your email to get instant access to exclusive gaming rewards
      </p>
      
      {success ? (
        <div className="bg-gaming-blue/10 border border-gaming-blue text-white p-4 rounded-lg mb-6 animate-fade-in">
          <p className="text-center">
            <span className="font-bold">Success!</span> Check your email for your exclusive rewards!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your gaming email"
              required
              className="w-full px-4 py-3 bg-gaming-darker border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gaming-blue/50 text-white placeholder-white/40"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="cta-btn w-full"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'GET MY REWARDS NOW'
            )}
          </button>
          
          <div className="flex items-center justify-center text-xs text-white/50 pt-2">
            <Shield size={12} className="mr-1" />
            <span>Your email is secure and won't be shared</span>
          </div>
        </form>
      )}
    </div>
  );
};

export default GamingForm;
