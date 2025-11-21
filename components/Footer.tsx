import React from 'react';
import { Sparkles, Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-950 text-stone-400 py-20 font-sans border-t border-amber-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-8">
            <div className="flex flex-col items-start">
              <div className="flex items-center text-white">
                <Sparkles className="mr-3 text-amber-600" size={24} />
                <span className="font-serif text-3xl font-bold tracking-tighter">Styllen</span>
              </div>
              <span className="text-[10px] font-bold text-amber-600 tracking-[0.3em] uppercase pl-10 mt-[-4px]">
                Fashion AI
              </span>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed max-w-md font-light">
              Styllen is an intelligent, next-generation fashion assistant that transforms how users plan outfits, explore trends, and define their personal style.
            </p>
            <div className="flex space-x-6 pt-4">
              <Instagram className="text-stone-500 hover:text-amber-500 cursor-pointer transition-colors" size={20} />
              <Twitter className="text-stone-500 hover:text-amber-500 cursor-pointer transition-colors" size={20} />
              <Facebook className="text-stone-500 hover:text-amber-500 cursor-pointer transition-colors" size={20} />
            </div>
          </div>
          
          {/* Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-white font-serif text-xl mb-8">Explore</h4>
            <ul className="space-y-4 text-sm tracking-wide">
              <li className="hover:text-amber-500 cursor-pointer transition-colors flex items-center group">
                <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                Trends Report
              </li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors flex items-center group">
                <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                AI Stylist
              </li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors flex items-center group">
                 <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                 Editorial
              </li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors flex items-center group">
                 <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                 About Styllen
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h4 className="text-white font-serif text-xl mb-8">Stay Ahead</h4>
            <p className="text-xs text-stone-500 mb-6 font-light">Join our exclusive list for weekly digests on the intersection of technology and high fashion.</p>
            <div className="flex flex-col space-y-4">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-stone-900/50 border-b border-stone-800 text-stone-300 text-sm px-0 py-3 focus:outline-none focus:border-amber-600 transition-colors placeholder-stone-600"
              />
              <button className="self-start text-amber-600 text-xs font-bold uppercase tracking-[0.2em] hover:text-amber-500 transition-colors mt-2">
                Subscribe
              </button>
            </div>
          </div>

        </div>
        
        <div className="mt-20 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-stone-600">
          <p>&copy; 2025 Styllen Fashion AI. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <span className="hover:text-stone-400 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-stone-400 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-stone-400 cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;