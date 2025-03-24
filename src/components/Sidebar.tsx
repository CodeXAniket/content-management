
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { contents } = useContent();
  
  // Get only published content for the sidebar
  const publishedContents = contents.filter(content => content.published);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div 
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-sidebar transition-all duration-300 ease-in-out z-40 border-r border-sidebar-border ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-none p-4 border-b border-sidebar-border flex items-center justify-between">
          <h2 className={`font-medium text-sidebar-foreground transition-opacity duration-300 ${collapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Published Content
          </h2>
          <button 
            onClick={toggleSidebar}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-sidebar-accent transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto py-2">
          {publishedContents.length === 0 ? (
            <div className={`px-4 py-3 text-sm text-sidebar-foreground/70 italic ${collapsed ? 'hidden' : 'block'}`}>
              No published content yet
            </div>
          ) : (
            <ul className="space-y-1 px-2">
              {publishedContents.map(content => (
                <li key={content.id}>
                  <Link 
                    to={`/preview/${content.id}`}
                    className={`flex items-center px-2 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 ${
                      collapsed ? 'justify-center' : 'justify-between'
                    }`}
                  >
                    {!collapsed && (
                      <div className="truncate pr-2">
                        <span className="text-sm font-medium">{content.title}</span>
                      </div>
                    )}
                    
                    {collapsed ? (
                      <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                        <span className="text-xs font-medium">{content.title.charAt(0)}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-sidebar-foreground/50">
                        {new Date(content.updatedAt).toLocaleDateString()}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="flex-none p-4 border-t border-sidebar-border">
          <div className={`text-xs text-sidebar-foreground/70 ${collapsed ? 'hidden' : 'block'}`}>
            <p>Total: {publishedContents.length} published</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
