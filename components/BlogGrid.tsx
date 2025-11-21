import React, { useState } from 'react';
import { BlogPost, LoadingState, ViewState } from '../types';
import { Loader2, Wand2, Sparkles } from 'lucide-react';
import { generateFashionArticle } from '../services/geminiService';

// Placeholder data
const INITIAL_POSTS: BlogPost[] = [
  {
    id: '0',
    title: 'The Essence of Fashion: Beyond the Fabric',
    excerpt: 'Fashion is more than just clothing; it is a non-verbal communication of self, a mirror of history, and a canvas for future innovation.',
    content: `
# The Essence of Fashion: Beyond the Fabric

Fashion is often dismissed as frivolous, a fleeting pursuit of the new. Yet, at its core, **fashion is a language**. It speaks before we utter a word, defining who we are, where we come from, and where we aspire to go.

## The Architecture of Style

In 2025, fashion has transcended mere utility. It is the architecture of our personal brand. 
*   **Expression:** It is the armor we wear to survive the reality of everyday life, as Bill Cunningham famously noted.
*   **Culture:** It reflects the zeitgeist—from the rebellion of punk to the mindfulness of sustainable minimalism.
*   **Innovation:** Today, fashion is the frontier of technology, where smart fabrics and AI-driven design meet traditional tailoring.

## The Cycle of Trends

Trends are the pulse of the industry, but style is the heart. While trends circulate with the seasons—dictated by runways in Paris, Milan, and now, digital spaces—style is the personal filtration of those trends. 

At Styllen, we believe understanding fashion means understanding this duality: the rapid pace of innovation versus the timelessness of true elegance.
    `,
    author: 'Styllen Editorial',
    date: 'Oct 14, 2025',
    category: 'Fashion Theory',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '1',
    title: 'The Renaissance of Digital Fashion',
    excerpt: 'How AI and 3D rendering are reshaping the way we perceive haute couture in the digital age.',
    content: `
# The Renaissance of Digital Fashion

Fashion has always been about expression, but the medium is shifting. With the advent of **Styllen's 3D visualization technology**, the barrier between imagination and reality is dissolving.

## Why 3D?

Traditional shopping is fraught with uncertainty. Will it fit? Does the color match my skin tone? 
Styllen answers these questions before you even touch the fabric.

*   **Precision sizing:** AI scans your unique measurements.
*   **Fabric physics:** See how silk drapes vs. how denim structures.
*   **Sustainability:** Reduce returns and carbon footprint.

Digital fashion isn't just a gimmick; it's the sustainable, personalized future of the industry.
    `,
    author: 'Styllen Editorial',
    date: 'Oct 12, 2025',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Autumn Layers: A Guide for Every Silhouette',
    excerpt: 'Mastering the art of layering without compromising on shape or style this season.',
    content: 'Full content here...',
    author: 'Mia V.',
    date: 'Sep 28, 2025',
    category: 'Styling',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Sustainable Chic: Buying Less, Wearing More',
    excerpt: 'Building a capsule wardrobe that transcends trends and seasons.',
    content: 'Full content here...',
    author: 'Alex R.',
    date: 'Sep 15, 2025',
    category: 'Sustainability',
    imageUrl: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

interface BlogGridProps {
  onSelectPost: (post: BlogPost) => void;
  setView: (view: ViewState) => void;
}

const BlogGrid: React.FC<BlogGridProps> = ({ onSelectPost, setView }) => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [topic, setTopic] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoadingState(LoadingState.LOADING);
    try {
      const generated = await generateFashionArticle(topic);
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: generated.title,
        excerpt: generated.excerpt,
        content: generated.content,
        author: 'Styllen AI',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        imageUrl: 'https://images.unsplash.com/photo-1550614000-4b9519e02529?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Generic creative placeholder
        category: 'AI Report',
        isAiGenerated: true,
      };
      setPosts([newPost, ...posts]);
      setTopic('');
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="bg-white min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-bold text-amber-600 tracking-[0.3em] uppercase mb-4">The Journal</h2>
          <p className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">
            The Narrative of Style
          </p>
          <p className="text-stone-500 font-light text-lg leading-relaxed">
            Fashion is a language that speaks before you do. Dive into our journal to explore the intricate dialogue between timeless elegance, current trends, and the technology shaping the way we dress.
          </p>
        </div>

        {/* Interactive AI Generator - Styled as a Feature */}
        <div className="mb-24 bg-stone-900 text-white p-1 lg:p-2 overflow-hidden">
          <div className="border border-stone-700 p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
             <div className="lg:w-1/2 relative z-10">
                 <div className="inline-flex items-center space-x-2 mb-6">
                    <Sparkles className="text-amber-500" size={18} />
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Interactive Feature</span>
                 </div>
                 <h3 className="text-3xl font-serif text-white mb-4">
                   Commission an Article
                 </h3>
                 <p className="text-stone-400 mb-8 leading-relaxed font-light">
                   Use Styllen's generative engine to write a custom fashion report for you. Enter a topic below.
                 </p>
                 
                 <form onSubmit={handleGenerate} className="w-full">
                  <div className="flex flex-col md:flex-row gap-0 border border-stone-600 bg-stone-800/50">
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Topic (e.g. 'Minimalism in 2025')"
                      className="w-full px-6 py-4 bg-transparent text-white placeholder-stone-500 focus:outline-none font-light"
                      disabled={loadingState === LoadingState.LOADING}
                    />
                    <button
                      type="submit"
                      disabled={loadingState === LoadingState.LOADING || !topic.trim()}
                      className="bg-stone-100 text-stone-900 px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-colors disabled:bg-stone-800 disabled:text-stone-600 whitespace-nowrap border-l border-stone-600 md:border-l-0 md:border-l-stone-600"
                    >
                      {loadingState === LoadingState.LOADING ? (
                        <Loader2 className="animate-spin h-4 w-4" />
                      ) : (
                        "Generate"
                      )}
                    </button>
                  </div>
                </form>
                {loadingState === LoadingState.ERROR && (
                  <p className="text-red-400 mt-3 text-sm">Generation failed. Please try again.</p>
                )}
              </div>
              <div className="lg:w-1/2 w-full h-64 lg:h-80 relative">
                {/* Abstract visuals */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Wand2 size={120} className="text-stone-500" />
                </div>
                <div className="grid grid-cols-2 gap-4 opacity-40">
                   <div className="h-32 bg-stone-700/50 rounded-lg"></div>
                   <div className="h-32 bg-stone-600/50 rounded-lg mt-8"></div>
                   <div className="h-32 bg-stone-800/50 rounded-lg -mt-8"></div>
                   <div className="h-32 bg-stone-700/50 rounded-lg"></div>
                </div>
              </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid gap-x-8 gap-y-16 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="group cursor-pointer flex flex-col" onClick={() => onSelectPost(post)}>
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-stone-200">
                <img 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
                  src={post.imageUrl} 
                  alt={post.title} 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-baseline mb-3">
                  <p className="text-[10px] font-bold text-amber-600 tracking-[0.2em] uppercase">
                    {post.category}
                  </p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest">
                    {post.date}
                  </p>
                </div>
                <h3 className="text-2xl font-serif text-stone-900 group-hover:text-amber-800 transition-colors mb-3 leading-tight">
                  {post.title}
                </h3>
                <p className="text-stone-500 font-light text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-900 uppercase tracking-wider">{post.author}</span>
                  {post.isAiGenerated && (
                     <Sparkles size={14} className="text-amber-400" />
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogGrid;