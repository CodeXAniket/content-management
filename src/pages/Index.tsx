// src/pages/BlogViewer.tsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useContent } from '../context/ContentContext';
import { useNavigate } from 'react-router-dom';

const BlogViewer: React.FC = () => {
  const { contents } = useContent();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter only published content and apply search
  const publishedContents = contents.filter(content => content.published);
  const filteredContents = publishedContents.filter(content =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to extract image URL from Markdown content
  const getImageUrl = (content: string): string | null => {
    const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
    return imageMatch ? imageMatch[1] : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="glass-card backdrop-blur-sm bg-white/70 border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Blog Explorer</h1>
                <p className="mt-2 text-gray-600">Discover our latest published articles</p>
              </div>
              <button
                onClick={() => navigate('/admin')}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-sm"
              >
                Go to Admin
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs by title or excerpt..."
              className="glass-input w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Blog List */}
          <div className="space-y-6">
            {filteredContents.length === 0 ? (
              <div className="glass-card p-12 text-center backdrop-blur-sm bg-white/70 border border-gray-200 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">No blogs found</h3>
                <p className="mt-2 text-gray-600">
                  {searchQuery ? 'No results match your search.' : 'No published blogs available yet.'}
                </p>
              </div>
            ) : (
              filteredContents.map(content => (
                <div
                  key={content.id}
                  className="glass-card backdrop-blur-sm bg-white/70 border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
                  onClick={() => navigate(`/preview/${content.id}`)}
                >
                  <div className="relative">
                    {getImageUrl(content.content) ? (
                      <img
                        src={getImageUrl(content.content)!}
                        alt={content.title}
                        className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900">{content.title}</h2>
                    <p className="mt-2 text-gray-600">{content.excerpt}</p>
                    <p className="mt-3 text-sm text-gray-500">
                      Published on {new Date(content.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogViewer;