'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Loader2, Plus, Edit, Trash2, Calendar, User } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import AdminLayout from '@/components/admin/AdminLayout';
import ProjectForm from '@/components/admin/ProjectForm';
import Image from 'next/image';
import type { Project } from '@/lib/dynamic-content';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/dynamic/projects');
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.data || []);
      } else {
        console.error('Failed to fetch projects:', data.message);
        setMessage({ type: 'error', text: 'Failed to load projects' });
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setMessage({ type: 'error', text: 'Error loading projects' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (project: Project) => {
    if (selectedProject) {
      // Update existing project
      setProjects(prev => prev.map(p => p.id === project.id ? project : p));
      setMessage({ type: 'success', text: 'Project updated successfully' });
    } else {
      // Add new project
      setProjects(prev => [...prev, project]);
      setMessage({ type: 'success', text: 'Project created successfully' });
    }
    
    setIsFormOpen(false);
    setSelectedProject(null);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };

  const handleDelete = async (project: Project) => {
    setIsDeleting(project.id);
    try {
      const response = await fetch(`/api/admin/dynamic/projects?id=${project.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setProjects(prev => prev.filter(p => p.id !== project.id));
        setMessage({ type: 'success', text: 'Project deleted successfully' });
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to delete project' });
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setMessage({ type: 'error', text: 'Error deleting project' });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleNewProject = () => {
    setSelectedProject(null);
    setIsFormOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <AdminLayout currentPage="projects">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Projects Management</h1>
            <p className="text-slate-300">Manage project listings with images and details</p>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleNewProject}
                className="bg-custom-yellow text-slate-900 hover:bg-custom-yellow/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-600">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {selectedProject ? 'Edit Project' : 'Add New Project'}
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  {selectedProject 
                    ? 'Update project information and image'
                    : 'Create a new project with image and details'
                  }
                </DialogDescription>
              </DialogHeader>
              <ProjectForm
                project={selectedProject || undefined}
                onSave={handleSave}
                onCancel={() => {
                  setIsFormOpen(false);
                  setSelectedProject(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-lg border flex items-center space-x-2 ${
                message.type === 'success'
                  ? 'bg-green-500/10 border-green-500/20 text-green-400'
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span>{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-custom-yellow" />
            <span className="ml-2 text-slate-300">Loading projects...</span>
          </div>
        ) : projects.length === 0 ? (
          <Card className="bg-slate-800/50 border-slate-600">
            <CardContent className="py-12 text-center">
              <p className="text-slate-400 text-lg mb-4">No projects found</p>
              <p className="text-slate-500 mb-6">Get started by adding your first project</p>
              <Button 
                onClick={handleNewProject}
                className="bg-custom-yellow text-slate-900 hover:bg-custom-yellow/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="bg-slate-800/50 border-slate-600">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-white flex items-center space-x-2">
                        <span>{project.title}</span>
                        <Badge variant="outline" className="border-custom-yellow text-custom-yellow">
                          {project.category}
                        </Badge>
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-slate-400 text-sm">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{project.client}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(project.completedDate)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(project)}
                        className="border-custom-yellow text-custom-yellow hover:bg-custom-yellow hover:text-slate-900"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isDeleting === project.id}
                            className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                          >
                            {isDeleting === project.id ? (
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4 mr-1" />
                            )}
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-slate-900 border-slate-600">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">
                              Delete Project
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-400">
                              Are you sure you want to delete &quot;{project.title}&quot;? This action cannot be undone and will also delete the associated image.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-700">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(project)}
                              className="bg-red-500 text-white hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Image */}
                    {project.image && (
                      <div className="md:col-span-1">
                        <div className="relative rounded-lg overflow-hidden bg-slate-700 aspect-video">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className={project.image ? "md:col-span-2" : "md:col-span-3"}>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-slate-300 mb-1">Description</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                        
                        {project.tags.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-300 mb-2">Tags</h4>
                            <div className="flex flex-wrap gap-1">
                              {project.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}