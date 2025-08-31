'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Loader2, Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import AdminLayout from '@/components/admin/AdminLayout';
import ServiceForm from '@/components/admin/ServiceForm';
import Image from 'next/image';
import type { Service } from '@/lib/dynamic-content';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/dynamic/services');
      const data = await response.json();
      
      if (data.success) {
        setServices(data.data || []);
      } else {
        console.error('Failed to fetch services:', data.message);
        setMessage({ type: 'error', text: 'Failed to load services' });
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setMessage({ type: 'error', text: 'Error loading services' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (service: Service) => {
    if (selectedService) {
      // Update existing service
      setServices(prev => prev.map(s => s.id === service.id ? service : s));
      setMessage({ type: 'success', text: 'Service updated successfully' });
    } else {
      // Add new service
      setServices(prev => [...prev, service]);
      setMessage({ type: 'success', text: 'Service created successfully' });
    }
    
    setIsFormOpen(false);
    setSelectedService(null);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  const handleDelete = async (service: Service) => {
    setIsDeleting(service.id);
    try {
      const response = await fetch(`/api/admin/dynamic/services?id=${service.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setServices(prev => prev.filter(s => s.id !== service.id));
        setMessage({ type: 'success', text: 'Service deleted successfully' });
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to delete service' });
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      setMessage({ type: 'error', text: 'Error deleting service' });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleNewService = () => {
    setSelectedService(null);
    setIsFormOpen(true);
  };

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <AdminLayout currentPage="services">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Services Management</h1>
            <p className="text-slate-300">Manage service listings with images and details</p>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleNewService}
                className="bg-custom-yellow text-slate-900 hover:bg-custom-yellow/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-600">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {selectedService ? 'Edit Service' : 'Add New Service'}
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  {selectedService 
                    ? 'Update service information and image'
                    : 'Create a new service with image and details'
                  }
                </DialogDescription>
              </DialogHeader>
              <ServiceForm
                service={selectedService || undefined}
                onSave={handleSave}
                onCancel={() => {
                  setIsFormOpen(false);
                  setSelectedService(null);
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
            <span className="ml-2 text-slate-300">Loading services...</span>
          </div>
        ) : services.length === 0 ? (
          <Card className="bg-slate-800/50 border-slate-600">
            <CardContent className="py-12 text-center">
              <p className="text-slate-400 text-lg mb-4">No services found</p>
              <p className="text-slate-500 mb-6">Get started by adding your first service</p>
              <Button 
                onClick={handleNewService}
                className="bg-custom-yellow text-slate-900 hover:bg-custom-yellow/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Service
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {services.map((service) => (
              <Card key={service.id} className="bg-slate-800/50 border-slate-600">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-white flex items-center space-x-2">
                        <span>{service.title}</span>
                        <Badge variant="outline" className="border-custom-yellow text-custom-yellow">
                          {service.icon}
                        </Badge>
                      </CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(service)}
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
                            disabled={isDeleting === service.id}
                            className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                          >
                            {isDeleting === service.id ? (
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
                              Delete Service
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-400">
                              Are you sure you want to delete &quot;{service.title}&quot;? This action cannot be undone and will also delete the associated image.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-700">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(service)}
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
                    {service.image && (
                      <div className="md:col-span-1">
                        <div className="relative rounded-lg overflow-hidden bg-slate-700 aspect-video">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className={service.image ? "md:col-span-2" : "md:col-span-3"}>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-slate-300 mb-1">Description</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        {service.fullDescription && service.fullDescription !== service.description && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-300 mb-1">Full Description</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                              {service.fullDescription}
                            </p>
                          </div>
                        )}
                        
                        {service.features.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-300 mb-1">Features</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {service.features.map((feature, index) => (
                                <li key={index} className="text-slate-400 text-sm">
                                  {feature}
                                </li>
                              ))}
                            </ul>
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