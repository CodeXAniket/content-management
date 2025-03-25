import React from "react";
import { Link } from "react-router-dom";
import { ContentItem, useContent } from "../context/ContentContext";

interface ContentCardProps {
  content: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const { selectContent, deleteContent } = useContent();

  const handleEdit = () => {
    selectContent(content.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm(`Are you sure you want to delete "${content.title}"?`)) {
      deleteContent(content.id);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="glass-card glass-card-hover animate-fade-in overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium">{content.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {content.excerpt}
            </p>
          </div>

          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              content.published
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {content.published ? "Published" : "Draft"}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="text-xs text-muted-foreground">
            <p>Created: {formatDate(content.createdAt)}</p>
            <p className="mt-1">Updated: {formatDate(content.updatedAt)}</p>
          </div>

          <div className="flex space-x-2">
            <Link
              to="/editor"
              onClick={handleEdit}
              className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium transition-all duration-200 hover:bg-primary/90 scale-hover"
            >
              Edit
            </Link>

            <Link
              to={`/preview/${content.id}`}
              className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium transition-all duration-200 hover:bg-secondary/80 scale-hover"
            >
              Preview
            </Link>

            <button
              onClick={handleDelete}
              className="px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-medium transition-all duration-200 hover:bg-destructive/20 scale-hover"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
