
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
            <h1 className="text-3xl font-medium tracking-tight">Content Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Manage all your content in one place.
            </p>
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
