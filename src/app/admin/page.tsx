"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import MachineToggle from "@/components/admin/MachineToggle";
import { motion } from "framer-motion";
import { Wrench, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";

interface Machine {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
  side: 'left' | 'right';
  forSale: boolean;
}

export default function AdminDashboard() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    forSale: 0,
    notForSale: 0
  });

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/machines");
      
      if (response.ok) {
        const data = await response.json();
        setMachines(data.data);
        
        // Calculate stats
        const forSaleCount = data.data.filter((m: Machine) => m.forSale).length;
        setStats({
          total: data.data.length,
          forSale: forSaleCount,
          notForSale: data.data.length - forSaleCount
        });
      } else {
        setError("Failed to fetch machines");
      }
    } catch (error) {
      setError("An error occurred while fetching machines");
      console.error("Error fetching machines:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMachineToggle = async (machineId: number, forSale: boolean) => {
    try {
      const response = await fetch("/api/admin/machines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ machineId, forSale }),
      });

      if (response.ok) {
        // Update local state
        setMachines(prev => prev.map(machine => 
          machine.id === machineId ? { ...machine, forSale } : machine
        ));
        
        // Update stats
        setStats(prev => ({
          ...prev,
          forSale: forSale ? prev.forSale + 1 : prev.forSale - 1,
          notForSale: forSale ? prev.notForSale - 1 : prev.notForSale + 1
        }));
      } else {
        console.error("Failed to update machine status");
      }
    } catch (error) {
      console.error("Error updating machine status:", error);
    }
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

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={fetchMachines}
            className="bg-custom-yellow hover:bg-custom-yellow-hover text-slate-900 px-4 py-2 rounded-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="dashboard">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
        <p className="text-slate-600">Manage your website content and machine availability</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
        >
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wrench className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Total Machines</p>
              <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
        >
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">For Sale</p>
              <p className="text-2xl font-bold text-slate-900">{stats.forSale}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
        >
          <div className="flex items-center">
            <div className="p-2 bg-slate-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-slate-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Not For Sale</p>
              <p className="text-2xl font-bold text-slate-900">{stats.notForSale}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Machines Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Machine Management</h2>
          <p className="text-sm text-slate-600">Toggle machines to mark them as available for sale</p>
        </div>
        
        <div className="p-6">
          {machines.length === 0 ? (
            <div className="text-center py-8">
              <Wrench className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">No machines found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {machines.map((machine, index) => (
                <motion.div
                  key={machine.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                >
                  <MachineToggle
                    machine={machine}
                    onToggle={handleMachineToggle}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
