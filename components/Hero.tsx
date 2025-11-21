import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ViewState } from '../types';

interface HeroProps {
  setView: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ setView }) => {
  const scrollToJournal = () => {
    const element = document.getElementById('featured-blog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-stone-900 h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-60"
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop"
          alt="High Fashion Editorial"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        
        <span className="inline-block py-1 px-3 border border-amber-500/50 rounded-full text-amber-400 font-medium tracking-widest uppercase text-[10px] mb-6 backdrop-blur-sm">
          The Future of Style
        </span>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white mb-8 tracking-tight leading-none">
          Intelligent <br/> <span className="italic text-stone-300">Couture</span>
        </h1>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-stone-200 font-light leading-relaxed mb-10">
            Styllen is an intelligent, next-generation fashion assistant that transforms how users plan outfits, explore trends, and define their personal style.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToJournal}
              className="px-8 py-4 bg-white text-stone-900 text-xs font-bold uppercase tracking-[0.2em] hover:bg-amber-50 transition-colors w-full sm:w-auto"
            >
              Read The Journal
            </button>
            <button
              onClick={() => setView('stylist')}
              className="px-8 py-4 bg-transparent border border-white text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-colors w-full sm:w-auto flex items-center justify-center"
            >
               Ask AI Stylist <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;