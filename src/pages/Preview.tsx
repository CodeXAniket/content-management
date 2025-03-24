
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useContent } from '../context/ContentContext';

// Simple function to convert markdown to HTML
const markdownToHTML = (markdown: string) => {
  let html = markdown;
  
  // Headers
  html = html.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>');
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>');
  
  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Lists
  html = html.replace(/^\- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>');
  html = html.replace(/^\d+\. (.*$)/gm, '<li class="ml-6 list-decimal">$1</li>');
  
  // Paragraphs
  html = html.replace(/^(?!<[hl\d]).+$/gm, (match) => {
    if (match.trim() === '') return '';
    if (match.startsWith('<li')) return match;
    return `<p class="mb-4">${match}</p>`;
  });
  
  // Remove extra line breaks
  html = html.replace(/\n\n/g, '\n');
  
  return html;
};

const Preview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { contents, selectContent } = useContent();
  const [content, setContent] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }
    
    const foundContent = contents.find(c => c.id === id);
    if (!foundContent) {
      navigate('/');
      return;
    }
    
    setContent(foundContent);
  }, [id, contents, navigate]);
  
  const handleEdit = () => {
    if (content) {
      selectContent(content.id);
      navigate('/editor');
    }
  };
  
  if (!content) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading content...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Sidebar />
      
      <main className="pt-24 pb-12 px-6 ml-64">
        <div className="max-w-3xl mx-auto">
          <div className="mb-3 animate-fade-in flex items-center justify-between">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              ← Back to dashboard
            </Link>
            
            <button
              onClick={handleEdit}
              className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Edit content
            </button>
          </div>
          
          <div className="glass-card p-8 animate-fade-in">
            <div className="mb-6 pb-4 border-b border-border">
              <h1 className="text-3xl font-bold tracking-tight">{content.title}</h1>
              <p className="mt-3 text-muted-foreground">{content.excerpt}</p>
              
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    content.published ? 'bg-green-500' : 'bg-amber-500'
                  }`}></span>
                  <span>{content.published ? 'Published' : 'Draft'}</span>
                </div>
                
                <div>
                  Last updated: {new Date(content.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: markdownToHTML(content.content) }}
            ></div>
            
            <div className="mt-12 pt-4 border-t border-border flex justify-between items-center">
              <button
                onClick={handleEdit}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-all duration-200 hover:bg-primary/90 scale-hover"
              >
                Edit this content
              </button>
              
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Back to dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Preview;
