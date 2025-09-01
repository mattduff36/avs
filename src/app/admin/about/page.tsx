"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Save, Edit2, X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AboutContent {
  story: {
    heading: string;
    paragraphs: string[];
  };
}

export default function AdminAboutPage() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isEditingStory, setIsEditingStory] = useState(false);
  
  // Edit states
  const [editStory, setEditStory] = useState({ heading: "", paragraphs: [""] });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/content?page=about");
      
      if (response.ok) {
        const data = await response.json();
        setContent(data.data);
      } else {
        // If no content exists, create default content
        const defaultContent: AboutContent = {
          story: {
            heading: "Our Story",
            paragraphs: [
              "A&V Squires Plant Co Limited has been serving the construction industry for over 50 years, establishing ourselves as one of the East Midlands' leading plant hire, civil engineering, and contract earthmoving companies.",
              "Founded in 1971, we have built our reputation on delivering high-quality, efficient, and reliable construction services to customers nationwide. Our commitment to excellence and customer satisfaction has been the cornerstone of our success.",
              "Through decades of experience, we have developed extensive expertise in all aspects of construction and civil engineering. Our skilled team and modern fleet of equipment enable us to tackle projects of any size and complexity."
            ]
          }
        };
        setContent(defaultContent);
      }
    } catch (error) {
      setError("An error occurred while fetching content");
      console.error("Error fetching content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startEditStory = () => {
    if (!content) return;
    setIsEditingStory(true);
    setEditStory({ ...content.story });
  };

  const cancelEdit = () => {
    setIsEditingStory(false);
    setEditStory({ heading: "", paragraphs: [""] });
  };

  const saveStory = async () => {
    if (!content) return;
    
    setIsSaving(true);
    try {
      const updates = { story: editStory };

      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page: "about", updates }),
      });

      if (response.ok) {
        const data = await response.json();
        setContent(data.data);
        setIsEditingStory(false);
      } else {
        console.error("Failed to save content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const addParagraph = () => {
    setEditStory(prev => ({
      ...prev,
      paragraphs: [...prev.paragraphs, ""]
    }));
  };

  const updateParagraph = (index: number, value: string) => {
    setEditStory(prev => ({
      ...prev,
      paragraphs: prev.paragraphs.map((p, i) => i === index ? value : p)
    }));
  };

  const removeParagraph = (index: number) => {
    setEditStory(prev => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== index)
    }));
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-yellow"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !content) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-white mb-2">Error Loading About Content</h2>
          <p className="text-slate-300 mb-4">{error}</p>
          <button
            onClick={fetchContent}
            className="bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900 px-4 py-2 rounded-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="about">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">About Page Content</h1>
        <p className="text-slate-300">Manage the content displayed on the About page</p>
      </div>

      {/* Company Story Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h2 className="text-xl font-semibold text-white">Company Story</h2>
          {!isEditingStory && (
            <Button
              onClick={startEditStory}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent self-start sm:self-auto"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>

        {isEditingStory ? (
          <div className="space-y-6">
            {/* Heading */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Section Heading</label>
              <input
                type="text"
                value={editStory.heading}
                onChange={(e) => setEditStory(prev => ({ ...prev, heading: e.target.value }))}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-slate-400 focus:ring-2 focus:ring-custom-yellow focus:border-transparent"
                placeholder="Section heading"
              />
            </div>

            {/* Paragraphs */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <label className="block text-sm font-medium text-slate-300">Story Paragraphs</label>
                <Button
                  onClick={addParagraph}
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent self-start sm:self-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Paragraph
                </Button>
              </div>
              
              <div className="space-y-4">
                {editStory.paragraphs.map((paragraph, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-1">
                      <textarea
                        value={paragraph}
                        onChange={(e) => updateParagraph(index, e.target.value)}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-slate-400 focus:ring-2 focus:ring-custom-yellow focus:border-transparent resize-none"
                        rows={4}
                        placeholder={`Paragraph ${index + 1}`}
                      />
                    </div>
                    {editStory.paragraphs.length > 1 && (
                      <Button
                        onClick={() => removeParagraph(index)}
                        variant="outline"
                        size="sm"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent mt-3"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button
                onClick={cancelEdit}
                disabled={isSaving}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={saveStory}
                disabled={isSaving}
                className="bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900"
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2"></div>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-white mb-3">{content.story.heading}</h3>
              <div className="space-y-4">
                {content.story.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-slate-300 bg-white/5 p-4 rounded-md leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AdminLayout>
  );
}