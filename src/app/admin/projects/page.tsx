"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { Edit2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  client: string;
  value: string;
  category: string;
  description: string;
  year: string;
  featured: boolean;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState("");

  useEffect(() => {
    // Load projects data (hardcoded for now, but could come from API)
    const projectsData: Project[] = [
      {
        id: 1,
        title: "New Car Park - Saint Gobain",
        client: "Saint Gobain",
        value: "£1,000,000.00",
        category: "Civil Engineering",
        description: "We are pleased to announce the successful installation of a new tarmac car park for one of our long-standing customers. This upgrade includes dedicated EV bays, ensuring convenience and sustainability for all users. Thank you for trusting us with your parking needs.",
        year: "2024",
        featured: true
      },
      {
        id: 2,
        title: "Multiple Major Civils Project's including Screenhouse, Crusher, Conveyor and Bridge Abutment Works",
        client: "Tarmac",
        value: "£500,000.00",
        category: "Civil Engineering",
        description: "Our large-scale civil works project presented a range of complex engineering challenges. From navigating ducting routes and constructing foundation base slabs on difficult terrain and cliff edges, to installing conveyor bases and ensuring stable access with stoned pathways, we tackled it all. Our team expertly managed the intricacies of piling mats and crane pads, demonstrating our commitment to overcoming obstacles in pursuit of excellence.",
        year: "2024",
        featured: true
      },
      {
        id: 3,
        title: "Site-wide civil engineering contracts for pumphouse bases, generator bases, fire main civils, tank repairs in confined spaces, landscaping, paving & surfacing works",
        client: "Exolum",
        value: "£380,000.00",
        category: "Civil Engineering",
        description: "From minor works to major infrastructure developments, we demonstrated professionalism and keen attention to detail to shine through in every initiative, including impressive site-wide terminal surfacing and significant electrical upgrades. With project values spanning from £1,000 to £500,000, for this customer we have made a remarkable impact with over £3 million spent in just the past year. The feedback from Contract and Project Managers is nothing short of fantastic, praising their top-notch safety measures, effective project management, and exceptional workmanship, all while building a strong relationship based on trust and reliability!",
        year: "2024",
        featured: false
      },
      {
        id: 4,
        title: "Tower works",
        client: "Omexom",
        value: "£100,000.00",
        category: "Specialised Works",
        description: "Working at numerous locations nationwide to install and remove overhead line tower foundations and create access. We also provide essential vegetation clearance services to facilitate smooth operations.",
        year: "2024",
        featured: false
      }
    ];
    
    setProjects(projectsData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-yellow"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-white mb-2">Error Loading Projects</h2>
          <p className="text-slate-300 mb-4">{error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="projects">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Projects Management</h1>
        <p className="text-slate-300">Manage project descriptions and details</p>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectToggle
            key={project.id}
            project={project}
            onUpdate={(updatedProject) => {
              setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
            }}
          />
        ))}
      </div>
    </AdminLayout>
  );
}

interface ProjectToggleProps {
  project: Project;
  onUpdate: (project: Project) => void;
}

function ProjectToggle({ project, onUpdate }: ProjectToggleProps) {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [editDescription, setEditDescription] = useState(project.description);
  const [editTitle, setEditTitle] = useState(project.title);
  const [editClient, setEditClient] = useState(project.client);
  const [editValue, setEditValue] = useState(project.value);
  const [editCategory, setEditCategory] = useState(project.category);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDescription = async () => {
    setIsSaving(true);
    try {
      // Here you would typically make an API call to save the description
      // For now, we'll just update the local state
      const updatedProject = { ...project, description: editDescription };
      onUpdate(updatedProject);
      setIsEditingDescription(false);
    } catch (error) {
      console.error("Error saving description:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDetails = async () => {
    setIsSaving(true);
    try {
      // Here you would typically make an API call to save the details
      // For now, we'll just update the local state
      const updatedProject = { 
        ...project, 
        title: editTitle,
        client: editClient,
        value: editValue,
        category: editCategory
      };
      onUpdate(updatedProject);
      setIsEditingDetails(false);
    } catch (error) {
      console.error("Error saving details:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditDescription(project.description);
    setEditTitle(project.title);
    setEditClient(project.client);
    setEditValue(project.value);
    setEditCategory(project.category);
    setIsEditingDescription(false);
    setIsEditingDetails(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 p-6"
    >
      {/* Project Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span>Client: {project.client}</span>
              <span>Value: {project.value}</span>
              <span>Category: {project.category}</span>
              <span>Year: {project.year}</span>
              {project.featured && <span className="bg-custom-yellow text-slate-900 px-2 py-1 rounded text-xs font-semibold">Featured</span>}
            </div>
          </div>
          {!isEditingDetails && (
            <Button
              onClick={() => setIsEditingDetails(true)}
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent ml-4"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Details
            </Button>
          )}
        </div>

        {/* Edit Details Form */}
        {isEditingDetails && (
          <div className="space-y-4 mb-6 p-4 bg-white/5 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-slate-400 focus:ring-2 focus:ring-custom-yellow focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Client</label>
                <input
                  type="text"
                  value={editClient}
                  onChange={(e) => setEditClient(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-slate-400 focus:ring-2 focus:ring-custom-yellow focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Value</label>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-slate-400 focus:ring-2 focus:ring-custom-yellow focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <input
                  type="text"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-slate-400 focus:ring-2 focus:ring-custom-yellow focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleCancelEdit}
                disabled={isSaving}
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSaveDetails}
                disabled={isSaving}
                size="sm"
                className="bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900"
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2"></div>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Description Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-medium text-white">Description</h4>
          {!isEditingDescription && (
            <Button
              onClick={() => setIsEditingDescription(true)}
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>

        {isEditingDescription ? (
          <div className="space-y-4">
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full h-32 p-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-slate-400 focus:ring-2 focus:ring-custom-yellow focus:border-transparent resize-none"
              placeholder="Project description"
            />
            <div className="flex space-x-2">
              <Button
                onClick={handleCancelEdit}
                disabled={isSaving}
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSaveDescription}
                disabled={isSaving}
                size="sm"
                className="bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900"
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2"></div>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-slate-300 bg-white/5 p-4 rounded-md">{project.description}</p>
        )}
      </div>
    </motion.div>
  );
}
