
import { useEffect, useState } from 'react';

export function useAnimatedValue(targetValue: number, duration: number = 1500, delay: number = 0) {
  const [value, setValue] = useState(0);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const startTime = performance.now();
      
      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function - easeOutQuad
        const easedProgress = 1 - (1 - progress) * (1 - progress);
        
        setValue(Math.floor(easedProgress * targetValue));
        
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      
      requestAnimationFrame(step);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [targetValue, duration, delay]);
  
  return value;
}

interface FadeInOptions {
  delay?: number;
  duration?: number;
  y?: number;
}

export function useFadeIn(options: FadeInOptions = {}) {
  const { delay = 0, duration = 300, y = 10 } = options;
  
  return {
    style: {
      opacity: 0,
      transform: `translateY(${y}px)`,
      animation: `fadeIn ${duration}ms ease-out ${delay}ms forwards`,
    },
    className: "opacity-0",
  };
}

export function staggeredDelay(index: number, baseDelay: number = 50): number {
  return index * baseDelay;
}
