import React from 'react';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogPostViewProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostView: React.FC<BlogPostViewProps> = ({ post, onBack }) => {
  return (
    <article className="min-h-screen bg-white pb-20">
      {/* Header Image */}
      <div className="relative h-[50vh] w-full">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 bg-rose-500 text-white text-xs font-bold tracking-wider uppercase rounded-sm mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-white/90 space-x-6">
              <div className="flex items-center">
                <User size={18} className="mr-2" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                <span>{post.date}</span>
              </div>
              {post.isAiGenerated && (
                <div className="flex items-center text-rose-300">
                    <Sparkles size={18} className="mr-2" />
                    <span>AI Original</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose prose-stone prose-lg md:prose-xl prose-headings:font-serif prose-a:text-rose-600 hover:prose-a:text-rose-500 prose-img:rounded-xl first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:float-left">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        
        <hr className="my-12 border-stone-200" />
        
        <div className="bg-stone-50 p-8 rounded-xl border border-stone-100">
          <h3 className="font-serif text-2xl font-bold mb-4">About Styllen</h3>
          <p className="text-stone-600">
            Styllen is revolutionizing the fashion industry by bridging the gap between AI and personal style. 
            Our mission is to provide inclusive, intelligent styling for everyone.
          </p>
        </div>
      </div>
    </article>
  );
};

export default BlogPostView;