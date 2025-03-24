
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent, ContentItem } from '../context/ContentContext';

const Editor: React.FC = () => {
  const { selectedContent, addContent, updateContent, clearSelectedContent } = useContent();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [published, setPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load selected content if available
  useEffect(() => {
    if (selectedContent) {
      setTitle(selectedContent.title);
      setContent(selectedContent.content);
      setExcerpt(selectedContent.excerpt);
      setPublished(selectedContent.published);
    } else {
      // Reset form if no selected content
      setTitle('');
      setContent('');
      setExcerpt('');
      setPublished(false);
    }
  }, [selectedContent]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (selectedContent) {
        // Update existing content
        updateContent(selectedContent.id, {
          title,
          content,
          excerpt,
          published,
        });
        
        // Navigate to the preview page
        navigate(`/preview/${selectedContent.id}`);
      } else {
        // Add new content
        const newContentData = {
          title,
          content,
          excerpt,
          published,
        };
        
        addContent(newContentData);
        clearSelectedContent();
        
        // Navigate back to dashboard
        navigate('/');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="glass-card p-6 transition-all duration-300">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="glass-input w-full px-4 py-2 text-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-primary/50 focus:outline-none"
              placeholder="Enter a title"
              required
            />
          </div>
          
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
              Excerpt
            </label>
            <input
              id="excerpt"
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="glass-input w-full px-4 py-2 text-sm transition-all duration-200 focus:ring-2 focus:ring-primary/50 focus:outline-none"
              placeholder="Brief summary of your content"
              required
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="glass-input w-full h-64 px-4 py-3 text-sm font-mono transition-all duration-200 focus:ring-2 focus:ring-primary/50 focus:outline-none"
              placeholder="Write your content here... (Markdown supported)"
              required
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="published"
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/25"
            />
            <label htmlFor="published" className="ml-2 block text-sm">
              Publish immediately
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => {
            clearSelectedContent();
            navigate('/');
          }}
          className="px-4 py-2 rounded-lg border border-muted bg-background text-foreground transition-all duration-200 hover:bg-secondary scale-hover"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 scale-hover"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : selectedContent ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default Editor;
