
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ContentCard from '../components/ContentCard';
import { useContent } from '../context/ContentContext';

const Index: React.FC = () => {
  const { contents } = useContent();
  const [filter, setFilter] = useState<'all' | 'published' | 'drafts'>('all');
  
  const filteredContents = contents.filter(content => {
    if (filter === 'all') return true;
    if (filter === 'published') return content.published;
    if (filter === 'drafts') return !content.published;
    return true;
  });
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Sidebar />
      
      <main className="pt-24 pb-12 px-6 ml-64">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="relative overflow-hidden rounded-xl mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&auto=format&fit=crop" 
                alt="Content Management" 
                className="w-full h-64 object-cover transition-all duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-background/90 to-transparent">
                <h1 className="text-3xl font-medium tracking-tight">Content Dashboard</h1>
                <p className="mt-2 text-muted-foreground">
                  Manage all your content in one place.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="glass-card overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format&fit=crop" 
                  alt="Technology" 
                  className="w-full h-40 object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="p-4 relative">
                  <h3 className="font-medium">Technology</h3>
                  <p className="text-sm text-muted-foreground">Latest tech articles</p>
                </div>
              </div>
              
              <div className="glass-card overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop" 
                  alt="Design" 
                  className="w-full h-40 object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="p-4 relative">
                  <h3 className="font-medium">Design</h3>
                  <p className="text-sm text-muted-foreground">Creative inspirations</p>
                </div>
              </div>
              
              <div className="glass-card overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop" 
                  alt="Analytics" 
                  className="w-full h-40 object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="p-4 relative">
                  <h3 className="font-medium">Analytics</h3>
                  <p className="text-sm text-muted-foreground">Track your content performance</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6 flex justify-between items-center animate-fade-in">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                  filter === 'all' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                All ({contents.length})
              </button>
              
              <button
                onClick={() => setFilter('published')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                  filter === 'published' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Published ({contents.filter(c => c.published).length})
              </button>
              
              <button
                onClick={() => setFilter('drafts')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                  filter === 'drafts' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Drafts ({contents.filter(c => !c.published).length})
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredContents.length === 0 ? (
              <div className="glass-card p-12 text-center animate-fade-in">
                <h3 className="text-lg font-medium">No content found</h3>
                <p className="mt-2 text-muted-foreground">
                  {filter === 'all' 
                    ? 'Get started by creating your first piece of content.' 
                    : filter === 'published' 
                      ? 'No published content yet. Publish your drafts to see them here.' 
                      : 'No drafts found. All your content is published.'}
                </p>
              </div>
            ) : (
              filteredContents.map(content => (
                <ContentCard key={content.id} content={content} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
