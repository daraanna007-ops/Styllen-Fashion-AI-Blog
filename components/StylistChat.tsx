import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, LoadingState } from '../types';
import { chatWithStyllen } from '../services/geminiService';
import { Send, Bot, User, Loader2, Camera, CloudSun, Info } from 'lucide-react';

const StylistChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'model',
      text: "Hello! I'm Styllen, your personal AI fashion assistant. I can help you plan outfits based on the weather, your skin tone, or a specific occasion. What's on your mind today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await chatWithStyllen(messages, userMessage.text);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Error handling inside service mostly, but fallback here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-stone-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[80vh] md:h-[700px]">
        
        {/* Sidebar / Info Panel */}
        <div className="bg-stone-900 text-stone-300 w-full md:w-1/3 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-white mb-8">
                <Bot size={32} className="text-rose-500" />
                <h2 className="font-serif text-2xl font-bold tracking-wide">AI Stylist</h2>
            </div>
            
            <div className="space-y-6">
                <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-700">
                    <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-2 flex items-center">
                        <CloudSun size={16} className="mr-2" /> Weather Aware
                    </h3>
                    <p className="text-sm text-stone-400">Tell me your location, and I'll suggest fabrics and layers tailored to the forecast.</p>
                </div>
                
                <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-700">
                    <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-2 flex items-center">
                        <Info size={16} className="mr-2" /> Occasion Ready
                    </h3>
                    <p className="text-sm text-stone-400">Wedding guest? Job interview? First date? I specialize in context-appropriate styling.</p>
                </div>

                <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-700">
                    <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-2 flex items-center">
                        <Camera size={16} className="mr-2" /> Visual Match
                    </h3>
                    <p className="text-sm text-stone-400">Describe a piece of clothing you own, and I'll build an outfit around it.</p>
                </div>
            </div>
          </div>
          
          <div className="text-xs text-stone-500 mt-6">
            Powered by Gemini 2.5 Flash
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-stone-50">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-stone-900 text-white rounded-br-none'
                      : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 opacity-50 text-xs">
                    {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                    <span>{msg.role === 'user' ? 'You' : 'Styllen'}</span>
                  </div>
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                 <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center space-x-2">
                    <Loader2 className="animate-spin text-rose-500" size={16} />
                    <span className="text-stone-500 text-sm">Curating style...</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-stone-200">
            <form onSubmit={handleSend} className="flex items-center space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about an outfit..."
                className="flex-1 bg-stone-100 border-transparent focus:bg-white focus:ring-2 focus:ring-rose-500 rounded-full px-6 py-3 outline-none transition-all text-stone-900"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-rose-500 text-white p-3 rounded-full hover:bg-rose-600 transition-colors disabled:bg-stone-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylistChat;