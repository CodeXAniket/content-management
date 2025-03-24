
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our content
export interface ContentItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

interface ContentContextType {
  contents: ContentItem[];
  selectedContent: ContentItem | null;
  addContent: (content: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateContent: (id: string, content: Partial<ContentItem>) => void;
  deleteContent: (id: string) => void;
  selectContent: (id: string) => void;
  clearSelectedContent: () => void;
}

// Create the context
const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Create sample content
const sampleContents: ContentItem[] = [
  {
    id: '1',
    title: 'Getting Started with Our CMS',
    content: `
      # Welcome to Our CMS
      
      This is a simple, elegant content management system designed with minimalism in mind.
      
      ## Features
      
      - Simple, intuitive interface
      - Live preview functionality
      - Clean article editor
      - Image embedding support
      
      ![Example Image](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop)
      
      Get started by creating your first piece of content!
    `,
    excerpt: 'A guide to getting started with our minimalist, elegant CMS platform.',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2023-06-15'),
    published: true,
  },
  {
    id: '2',
    title: 'Advanced Content Management',
    content: `
      # Advanced Content Management
      
      Take your content to the next level with these advanced tips and techniques.
      
      ## Topics Covered
      
      - Content organization strategies
      - Using tags and categories
      - Publishing workflows
      - Adding beautiful images to your content
      
      ![Content Strategy](https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop)
      
      Master these techniques to become a content management pro!
    `,
    excerpt: 'Advanced techniques for managing your content effectively.',
    createdAt: new Date('2023-07-20'),
    updatedAt: new Date('2023-07-25'),
    published: true,
  },
  {
    id: '3',
    title: 'Design Principles for Content',
    content: `
      # Design Principles for Content
      
      Learn how to apply fundamental design principles to your content.
      
      ## Key Principles
      
      - Simplicity
      - Hierarchy
      - Balance
      - Contrast
      
      ![Design Principles](https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop)
      
      Apply these principles to create visually compelling content.
    `,
    excerpt: 'Understanding and applying fundamental design principles to your content.',
    createdAt: new Date('2023-08-10'),
    updatedAt: new Date('2023-08-12'),
    published: false,
  },
];

// Create the provider component
export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contents, setContents] = useState<ContentItem[]>(() => {
    // Try to get contents from localStorage
    const savedContents = localStorage.getItem('cms-contents');
    return savedContents ? JSON.parse(savedContents) : sampleContents;
  });
  
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);

  // Save contents to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cms-contents', JSON.stringify(contents));
  }, [contents]);

  // Add new content
  const addContent = (content: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    const newContent: ContentItem = {
      ...content,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    
    setContents([newContent, ...contents]);
    return newContent.id;
  };

  // Update existing content
  const updateContent = (id: string, content: Partial<ContentItem>) => {
    setContents(contents.map(item => 
      item.id === id 
        ? { ...item, ...content, updatedAt: new Date() } 
        : item
    ));
    
    if (selectedContent?.id === id) {
      setSelectedContent(prev => prev ? { ...prev, ...content, updatedAt: new Date() } : null);
    }
  };

  // Delete content
  const deleteContent = (id: string) => {
    setContents(contents.filter(item => item.id !== id));
    if (selectedContent?.id === id) {
      setSelectedContent(null);
    }
  };

  // Select content for editing
  const selectContent = (id: string) => {
    const content = contents.find(item => item.id === id);
    if (content) {
      setSelectedContent(content);
    }
  };

  // Clear selected content
  const clearSelectedContent = () => {
    setSelectedContent(null);
  };

  // Create the context value
  const contextValue: ContentContextType = {
    contents,
    selectedContent,
    addContent,
    updateContent,
    deleteContent,
    selectContent,
    clearSelectedContent,
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
};

// Create a hook for using the content context
export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
