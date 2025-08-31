'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, Loader2, Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import AdminLayout from '@/components/admin/AdminLayout';
import MachineForm from '@/components/admin/MachineForm';
import Image from 'next/image';
import type { Machine } from '@/lib/dynamic-content';

export default function AdminMachinesPage() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isTogglingForSale, setIsTogglingForSale] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const response = await fetch('/api/admin/dynamic/machines');
      const data = await response.json();
      
      if (data.success) {
        setMachines(data.data || []);
      } else {
        console.error('Failed to fetch machines:', data.message);
        setMessage({ type: 'error', text: 'Failed to load machines' });
      }
    } catch (error) {
      console.error('Error fetching machines:', error);
      setMessage({ type: 'error', text: 'Error loading machines' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (machine: Machine) => {
    if (selectedMachine) {
      // Update existing machine
      setMachines(prev => prev.map(m => m.id === machine.id ? machine : m));
      setMessage({ type: 'success', text: 'Machine updated successfully' });
    } else {
      // Add new machine
      setMachines(prev => [...prev, machine]);
      setMessage({ type: 'success', text: 'Machine created successfully' });
    }
    
    setIsFormOpen(false);
    setSelectedMachine(null);
  };

  const handleEdit = (machine: Machine) => {
    setSelectedMachine(machine);
    setIsFormOpen(true);
  };

  const handleToggleForSale = async (machine: Machine, forSale: boolean) => {
    setIsTogglingForSale(machine.id);
    try {
      const formData = new FormData();
      formData.append('id', machine.id);
      formData.append('forSale', forSale.toString());

      const response = await fetch('/api/admin/dynamic/machines', {
        method: 'PUT',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setMachines(prev => prev.map(m => 
          m.id === machine.id ? { ...m, forSale } : m
        ));
        setMessage({ 
          type: 'success', 
          text: `Machine ${forSale ? 'marked as for sale' : 'removed from sale'}` 
        });
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to update machine' });
      }
    } catch (error) {
      console.error('Error toggling for sale status:', error);
      setMessage({ type: 'error', text: 'Error updating machine' });
    } finally {
      setIsTogglingForSale(null);
    }
  };

  const handleDelete = async (machine: Machine) => {
    setIsDeleting(machine.id);
    try {
      const response = await fetch(`/api/admin/dynamic/machines?id=${machine.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setMachines(prev => prev.filter(m => m.id !== machine.id));
        setMessage({ type: 'success', text: 'Machine deleted successfully' });
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to delete machine' });
      }
    } catch (error) {
      console.error('Error deleting machine:', error);
      setMessage({ type: 'error', text: 'Error deleting machine' });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleNewMachine = () => {
    setSelectedMachine(null);
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
    <AdminLayout currentPage="machines">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Machines Management</h1>
            <p className="text-slate-300">Manage machine listings with images and details</p>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleNewMachine}
                className="bg-custom-yellow text-slate-900 hover:bg-custom-yellow/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Machine
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-600">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {selectedMachine ? 'Edit Machine' : 'Add New Machine'}
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  {selectedMachine 
                    ? 'Update machine information and image'
                    : 'Create a new machine with image and details'
                  }
                </DialogDescription>
              </DialogHeader>
              <MachineForm
                machine={selectedMachine || undefined}
                onSave={handleSave}
                onCancel={() => {
                  setIsFormOpen(false);
                  setSelectedMachine(null);
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
            <span className="ml-2 text-slate-300">Loading machines...</span>
          </div>
        ) : machines.length === 0 ? (
          <Card className="bg-slate-800/50 border-slate-600">
            <CardContent className="py-12 text-center">
              <p className="text-slate-400 text-lg mb-4">No machines found</p>
              <p className="text-slate-500 mb-6">Get started by adding your first machine</p>
              <Button 
                onClick={handleNewMachine}
                className="bg-custom-yellow text-slate-900 hover:bg-custom-yellow/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Machine
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {machines.map((machine) => (
              <Card key={machine.id} className="bg-slate-800/50 border-slate-600">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-white flex items-center space-x-2">
                        <span>{machine.title}</span>
                        {machine.forSale && (
                          <Badge className="bg-custom-yellow text-slate-900">
                            FOR SALE
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Layout: {machine.side === 'left' ? 'Left' : 'Right'} side
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`forSale-${machine.id}`} className="text-sm text-slate-300">
                          For Sale
                        </Label>
                        <Switch
                          id={`forSale-${machine.id}`}
                          checked={machine.forSale}
                          onCheckedChange={(checked) => handleToggleForSale(machine, checked)}
                          disabled={isTogglingForSale === machine.id}
                        />
                        {isTogglingForSale === machine.id && (
                          <Loader2 className="h-4 w-4 animate-spin text-custom-yellow" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(machine)}
                          className="border-custom-yellow text-custom-yellow hover:bg-custom-yellow hover:text-slate-900"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isDeleting === machine.id}
                            className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                          >
                            {isDeleting === machine.id ? (
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
                              Delete Machine
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-400">
                              Are you sure you want to delete &quot;{machine.title}&quot;? This action cannot be undone and will also delete the associated image.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-700">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(machine)}
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
                    {machine.image && (
                      <div className="md:col-span-1">
                        <div className="relative rounded-lg overflow-hidden bg-slate-700 aspect-video">
                          <Image
                            src={machine.image}
                            alt={machine.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className={machine.image ? "md:col-span-2" : "md:col-span-3"}>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-slate-300 mb-1">Description</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            {machine.description}
                          </p>
                        </div>
                        
                        {machine.features.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-300 mb-1">Features</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {machine.features.map((feature, index) => (
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