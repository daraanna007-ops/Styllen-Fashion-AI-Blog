import React, { useState } from 'react';
import { Menu, X, Sparkles, Search } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navClass = (view: ViewState) => 
    `cursor-pointer transition-colors text-xs uppercase tracking-[0.2em] font-medium ${currentView === view ? 'text-amber-700 border-b border-amber-700 pb-1' : 'text-stone-500 hover:text-stone-900'}`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-stone-900">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo - Centered on Desktop for Editorial Feel, Left on Mobile */}
          <div className="flex flex-col items-start md:items-center cursor-pointer group" onClick={() => setView('home')}>
            <div className="flex items-center">
              <Sparkles className="text-amber-500 mr-3 group-hover:rotate-12 transition-transform duration-700" size={28} strokeWidth={1} />
              <span className="font-serif text-4xl md:text-5xl font-bold text-stone-900 tracking-tighter">Styllen</span>
            </div>
            <span className="text-[10px] md:text-[11px] font-sans font-bold text-amber-600 tracking-[0.3em] uppercase pl-10 md:pl-12 mt-[-6px]">
              Fashion AI
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-12 items-center">
            <button onClick={() => setView('home')} className={navClass('home')}>The Journal</button>
            <button onClick={() => setView('stylist')} className={navClass('stylist')}>AI Stylist</button>
            <button className="text-stone-400 hover:text-stone-900 transition-colors">
              <Search size={18} strokeWidth={2} />
            </button>
          </nav>

          {/* Mobile Placeholder */}
          <div className="md:hidden w-6"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-100 absolute w-full top-28 left-0 z-40 animate-in slide-in-from-top-5">
          <div className="px-8 py-8 space-y-6 text-center">
            <button 
              onClick={() => { setView('home'); setIsMobileMenuOpen(false); }} 
              className="block w-full text-sm uppercase tracking-[0.2em] font-medium text-stone-900"
            >
              The Journal
            </button>
            <button 
              onClick={() => { setView('stylist'); setIsMobileMenuOpen(false); }} 
              className="block w-full text-sm uppercase tracking-[0.2em] font-medium text-stone-900"
            >
              AI Stylist
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;