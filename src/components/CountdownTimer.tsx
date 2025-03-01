
import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ hours = 24, minutes = 0, seconds = 0 }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours,
    minutes,
    seconds
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({
          ...timeLeft,
          seconds: timeLeft.seconds - 1
        });
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({
          ...timeLeft,
          minutes: timeLeft.minutes - 1,
          seconds: 59
        });
      } else if (timeLeft.hours > 0) {
        setTimeLeft({
          hours: timeLeft.hours - 1,
          minutes: 59,
          seconds: 59
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="flex flex-col items-center">
        <div className="glass-panel w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
          <span className="font-display text-2xl md:text-3xl font-bold text-gaming-blue">
            {formatTime(timeLeft.hours)}
          </span>
        </div>
        <span className="text-xs mt-1 text-white/70">HOURS</span>
      </div>
      <div className="text-xl md:text-2xl font-bold text-white/50">:</div>
      <div className="flex flex-col items-center">
        <div className="glass-panel w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
          <span className="font-display text-2xl md:text-3xl font-bold text-gaming-purple">
            {formatTime(timeLeft.minutes)}
          </span>
        </div>
        <span className="text-xs mt-1 text-white/70">MINUTES</span>
      </div>
      <div className="text-xl md:text-2xl font-bold text-white/50">:</div>
      <div className="flex flex-col items-center">
        <div className="glass-panel w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
          <span className="font-display text-2xl md:text-3xl font-bold text-gaming-pink">
            {formatTime(timeLeft.seconds)}
          </span>
        </div>
        <span className="text-xs mt-1 text-white/70">SECONDS</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
