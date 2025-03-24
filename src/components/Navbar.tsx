
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { selectedContent } = useContent();
  
  const isEditing = location.pathname === '/editor' && selectedContent;
  const isCreating = location.pathname === '/editor' && !selectedContent;
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) return null;

  return (
    <header className="glass-card w-full z-50 fixed top-0 left-0 right-0 border-b border-white/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className="text-xl font-medium tracking-tight transition-all duration-300 hover:text-primary"
          >
            <span className="text-primary">Minimal</span>CMS
          </Link>
        </div>
        
        <div className="flex items-center space-x-6">
          {isEditing && (
            <div className="text-sm text-muted-foreground animate-fade-in">
              Editing: <span className="font-medium text-foreground">{selectedContent.title}</span>
            </div>
          )}
          
          {isCreating && (
            <div className="text-sm text-muted-foreground animate-fade-in">
              Creating new content
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            {location.pathname !== '/' && (
              <Link 
                to="/" 
                className="text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-secondary"
              >
                Dashboard
              </Link>
            )}
            
            {location.pathname === '/' && (
              <Link 
                to="/editor" 
                className="text-sm font-medium bg-primary text-primary-foreground px-4 py-1.5 rounded-lg transition-all duration-300 hover:bg-primary/90 scale-hover"
              >
                New Content
              </Link>
            )}
            
            {(isEditing || isCreating) && (
              <Link 
                to={isEditing ? `/preview/${selectedContent.id}` : '/'}
                className="text-sm font-medium bg-accent text-accent-foreground px-4 py-1.5 rounded-lg transition-all duration-300 hover:bg-accent/80 scale-hover"
              >
                {isEditing ? 'Preview' : 'Cancel'}
              </Link>
            )}
            
            <Link
              to="/login"
              className="text-sm font-medium px-4 py-1.5 rounded-lg bg-secondary text-secondary-foreground transition-all duration-300 hover:bg-secondary/80 scale-hover"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
