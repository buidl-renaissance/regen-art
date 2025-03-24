"use client";

import { useState } from "react";
import { Artwork } from "../../../types";
import Image from "next/image";

interface ContentProps {
  artwork: Artwork;
}

interface ContentItem {
  text: string;
  image?: string;
}

export default function Content({ artwork }: ContentProps) {
  const [newContent, setNewContent] = useState("");
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim() && !imageFile) return;

    setIsLoading(true);
    setError("");

    try {
      // Here you would typically upload the image to a storage service
      // and make an API call to save the content + image URL
      // For now, we'll just use the local preview URL
      console.log("newContent", newContent, artwork);
      console.log("imageFile", imageFile);

      setContents([...contents, {
        text: newContent,
        image: imagePreview || undefined
      }]);
      
      setNewContent("");
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      setError("Failed to add content. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        Related Content
      </h2>

      {/* Content List */}
      <div className="space-y-4">
        {contents.map((content, index) => (
          <div 
            key={index}
            className="p-4 bg-white dark:bg-neutral-800 rounded-lg shadow"
          >
            {content.image && (
              <div className="relative w-full h-64 mb-4">
                <Image
                  src={content.image}
                  alt="Content image"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            )}
            <p className="text-neutral-700 dark:text-neutral-300">{content.text}</p>
          </div>
        ))}
      </div>

      {/* Add Content Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="content" 
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
          >
            Add Related Content
          </label>
          <textarea
            id="content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Share your thoughts, interpretations, or related information..."
            className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50"
            rows={4}
          />
        </div>

        <div>
          <label 
            htmlFor="image"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
          >
            Add Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-neutral-700 dark:text-neutral-300"
          />
          {imagePreview && (
            <div className="relative w-full h-48 mt-2">
              <Image
                src={imagePreview}
                alt="Upload preview"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading || (!newContent.trim() && !imageFile)}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg transition ${
            isLoading || (!newContent.trim() && !imageFile)
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-blue-600'
          }`}
        >
          {isLoading ? "Adding..." : "Add Content"}
        </button>
      </form>
    </div>
  );
}
