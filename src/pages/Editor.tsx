
import React from 'react';
import Navbar from '../components/Navbar';
import EditorComponent from '../components/Editor';

const Editor: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-medium tracking-tight">Content Editor</h1>
            <p className="mt-2 text-muted-foreground">
              Create or edit your content
            </p>
          </div>
          
          <EditorComponent />
        </div>
      </main>
    </div>
  );
};

export default Editor;
