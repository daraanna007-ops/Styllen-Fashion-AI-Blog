import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import BlogGrid from './components/BlogGrid';
import BlogPostView from './components/BlogPostView';
import StylistChat from './components/StylistChat';
import { ViewState, BlogPost } from './types';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    setView('article');
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero setView={setView} />
            <div id="featured-blog">
                <BlogGrid onSelectPost={handleSelectPost} setView={setView} />
            </div>
          </>
        );
      case 'blog':
        return <BlogGrid onSelectPost={handleSelectPost} setView={setView} />;
      case 'article':
        return selectedPost ? (
          <BlogPostView 
            post={selectedPost} 
            onBack={() => setView('home')} 
          />
        ) : (
          <BlogGrid onSelectPost={handleSelectPost} setView={setView} />
        );
      case 'stylist':
        return <StylistChat />;
      default:
        return <Hero setView={setView} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {currentView !== 'article' && <Header currentView={currentView} setView={setView} />}
      <main className="flex-grow">
        {renderContent()}
      </main>
      {currentView !== 'stylist' && currentView !== 'article' && <Footer />}
    </div>
  );
};

export default App;