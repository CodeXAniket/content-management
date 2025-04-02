// src/pages/AdminDashboard.tsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ContentCard from '../components/ContentCard';
import { useContent } from '../context/ContentContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { contents } = useContent();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'published' | 'drafts'>('all');

  const filteredContents = contents.filter(content => {
    if (filter === 'all') return true;
    if (filter === 'published') return content.published;
    if (filter === 'drafts') return !content.published;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />
      <Sidebar />

      <main className="pt-24 pb-12 px-6 ml-64">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="glass-card backdrop-blur-sm bg-white/70 border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
                <p className="mt-2 text-gray-600">Manage your content efficiently</p>
              </div>
              <button
                onClick={() => navigate('/editor')}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-sm"
              >
                Create New
              </button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="mb-6 flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'bg-white/50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All ({contents.length})
              </button>
              <button
                onClick={() => setFilter('published')}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                  filter === 'published'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'bg-white/50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Published ({contents.filter(c => c.published).length})
              </button>
              <button
                onClick={() => setFilter('drafts')}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                  filter === 'drafts'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'bg-white/50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Drafts ({contents.filter(c => !c.published).length})
              </button>
            </div>
          </div>

          {/* Content List */}
          <div className="space-y-4">
            {filteredContents.length === 0 ? (
              <div className="glass-card p-12 text-center backdrop-blur-sm bg-white/70 border border-gray-200 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">No content found</h3>
                <p className="mt-2 text-gray-600">
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

export default AdminDashboard;