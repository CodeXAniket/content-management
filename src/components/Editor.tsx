import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContent, ContentItem } from "../context/ContentContext";
import ReactMarkdown from "react-markdown";

const Editor: React.FC = () => {
  const { selectedContent, addContent, updateContent, clearSelectedContent } = useContent();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [published, setPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (selectedContent) {
      setTitle(selectedContent.title);
      setContent(selectedContent.content);
      setExcerpt(selectedContent.excerpt);
      setPublished(selectedContent.published);
      const imageMatch = selectedContent.content.match(/!\[.*?\]\((.*?)\)/);
      setImagePreview(imageMatch ? imageMatch[1] : null);
      setTags([]);
    } else {
      resetForm();
    }
  }, [selectedContent]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setExcerpt("");
    setPublished(false);
    setImageFile(null);
    setImagePreview(null);
    setTags([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      const newTag = e.currentTarget.value.trim();
      if (!tags.includes(newTag)) setTags([...tags, newTag]);
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const contentWithImage = imagePreview 
        ? `${content}\n\n![Featured Image](${imagePreview})`
        : content;

      const contentData: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'> = {
        title,
        content: contentWithImage,
        excerpt,
        published,
      };

      if (selectedContent) {
        updateContent(selectedContent.id, contentData);
        navigate(`/preview/${selectedContent.id}`);
      } else {
        addContent(contentData);
        clearSelectedContent();
        navigate("/");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass-card backdrop-blur-sm bg-white/70 border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {selectedContent ? "Edit Your Content" : "Create New Content"}
            </h1>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-sm"
            >
              {showPreview ? "Back to Editing" : "Live Preview"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="glass-card backdrop-blur-sm bg-white/70 border border-gray-200 rounded-xl p-8 shadow-sm">
          {showPreview ? (
            <div className="prose max-w-none text-gray-800">
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              {imagePreview && (
                <img 
                  src={imagePreview} 
                  alt="Featured" 
                  className="w-full max-h-96 object-cover rounded-lg mb-6 shadow-sm" 
                />
              )}
              <p className="text-gray-600 italic mb-6">{excerpt}</p>
              <ReactMarkdown>{content}</ReactMarkdown>
              {tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="glass-input w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your captivating title..."
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <div className="glass-input bg-white/50 border border-gray-200 rounded-lg p-4">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-all duration-200"
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-w-sm h-auto rounded-lg shadow-sm" 
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="mt-2 text-sm text-red-500 hover:text-red-600 transition-colors"
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <input
                  id="excerpt"
                  type="text"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="glass-input w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="A brief teaser of your content..."
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="glass-input w-full h-80 px-4 py-3 bg-white/50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
                  placeholder="Pour your thoughts here... (Markdown supported)"
                  required
                />
                <p className="mt-2 text-xs text-gray-500">
                  Supports Markdown: # Headings, **bold**, *italic*, - lists, ![image](url)
                </p>
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (Press Enter to add)
                </label>
                <input
                  id="tags"
                  type="text"
                  onKeyDown={handleTagAdd}
                  className="glass-input w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Add some tags..."
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-red-500 hover:text-red-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Publish Toggle */}
              <div className="flex items-center">
                <input
                  id="published"
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-white"
                />
                <label htmlFor="published" className="ml-3 text-sm text-gray-700">
                  Publish immediately
                </label>
              </div>

              {/* Actions */}
              <div className="pt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    clearSelectedContent();
                    navigate("/");
                  }}
                  className="px-6 py-2 bg-white/50 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 disabled:opacity-50 shadow-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : selectedContent ? "Update" : "Create"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;