import React, { useEffect } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    // Reduced timer slightly as blinking sequence is removed
    const timer = setTimeout(() => {
      onFinish();
    }, 3500); 

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center font-sans overflow-hidden">
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes drawLine {
          0% { width: 0; opacity: 0; }
          10% { opacity: 1; }
          100% { width: 320px; opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-logo-fade {
          animation: fadeIn 1.2s ease-out forwards;
        }
        .animate-line-draw {
          width: 0;
          animation: drawLine 1.0s ease-out forwards;
          animation-delay: 0.8s;
        }
        .animate-text-fade {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 1.2s;
        }
      `}</style>
      
      <div className="flex flex-col items-center justify-center relative p-8 w-full">
        {/* Logo Image - Increased size significantly */}
        <div className="mb-8 relative w-full max-w-[600px] flex items-center justify-center px-4">
            <img 
            src="https://lh3.googleusercontent.com/d/18XFnqkdZT_B2kUczglilONvEPXYy7daD" 
            alt="Company Logo" 
            className="w-full h-auto object-contain animate-logo-fade opacity-0"
            />
        </div>
        
        {/* Red Line */}
        <div className="h-[4px] bg-red-600 rounded-full animate-line-draw mb-6"></div>
        
        {/* Slogan */}
        <p className="text-slate-500 font-medium tracking-[0.25em] text-sm uppercase animate-text-fade text-center">
          Adding Value Through Experience
        </p>
      </div>
    </div>
  );
};