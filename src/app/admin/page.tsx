"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Users, 
  Activity,
  FileText,
  Briefcase,
  FolderOpen,
  Wrench,
  Calendar
} from "lucide-react";

interface AdminStats {
  totalSessions: number;
  totalChanges: number;
  lastLogin?: string;
  changesThisWeek: number;
}

interface AdminChange {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  section: string;
  itemId?: string | number;
}

interface AdminSession {
  id: string;
  loginTime: string;
  logoutTime?: string;
  ipAddress?: string;
  userAgent?: string;
  duration?: number;
}

export default function AdminDashboard() {
  const [adminStats, setAdminStats] = useState<AdminStats>({
    totalSessions: 0,
    totalChanges: 0,
    changesThisWeek: 0
  });
  const [recentChanges, setRecentChanges] = useState<AdminChange[]>([]);
  const [recentSessions, setRecentSessions] = useState<AdminSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch activity data
      const activityResponse = await fetch("/api/admin/activity");

      if (activityResponse.ok) {
        const activityData = await activityResponse.json();
        setAdminStats(activityData.data.stats);
        setRecentChanges(activityData.data.changes);
        setRecentSessions(activityData.data.sessions);
      }
    } catch (error) {
      setError("An error occurred while fetching dashboard data");
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'N/A';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
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
          <div className="h-12 w-12 text-red-400 mx-auto mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-white mb-2">Error Loading Dashboard</h2>
          <p className="text-slate-300 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
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
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-slate-300">Overview of your website management and activity</p>
        {adminStats.lastLogin && (
          <p className="text-sm text-slate-400 mt-1">
            Last login: {formatDate(adminStats.lastLogin)}
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 mb-8"
      >
        <div className="px-6 py-4 border-b border-white/20">
          <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
          <p className="text-sm text-slate-300">Access different content management sections</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/machines">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 hover:bg-white/10 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <Wrench className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Machines Page</h3>
                    <p className="text-xs text-slate-400">Manage machine content</p>
                  </div>
                </div>
              </motion.div>
            </Link>

            <Link href="/admin/about">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/5 hover:bg-white/10 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                    <FileText className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">About Page</h3>
                    <p className="text-xs text-slate-400">Edit about content</p>
                  </div>
                </div>
              </motion.div>
            </Link>

            <Link href="/admin/services">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/5 hover:bg-white/10 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                    <Briefcase className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Services Page</h3>
                    <p className="text-xs text-slate-400">Edit services content</p>
                  </div>
                </div>
              </motion.div>
            </Link>

            <Link href="/admin/projects">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white/5 hover:bg-white/10 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                    <FolderOpen className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Projects Page</h3>
                    <p className="text-xs text-slate-400">Manage projects</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 p-6"
        >
          <div className="flex items-center">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Total Sessions</p>
              <p className="text-2xl font-bold text-white">{adminStats.totalSessions}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 p-6"
        >
          <div className="flex items-center">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Activity className="h-6 w-6 text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Total Changes</p>
              <p className="text-2xl font-bold text-white">{adminStats.totalChanges}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 p-6"
        >
          <div className="flex items-center">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Calendar className="h-6 w-6 text-cyan-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-300">Changes This Week</p>
              <p className="text-2xl font-bold text-white">{adminStats.changesThisWeek}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Changes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm border border-white/20"
        >
          <div className="px-6 py-4 border-b border-white/20">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Changes
            </h2>
            <p className="text-sm text-slate-300">Latest content modifications</p>
          </div>
          
          <div className="p-6">
            {recentChanges.length > 0 ? (
              <div className="space-y-4">
                {recentChanges.slice(0, 5).map((change) => (
                  <div key={change.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-custom-yellow rounded-full mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium">{change.details}</p>
                      <p className="text-xs text-slate-400">
                        {change.section} • {formatDate(change.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">No recent changes</p>
            )}
          </div>
        </motion.div>

        {/* Recent Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm border border-white/20"
        >
          <div className="px-6 py-4 border-b border-white/20">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Recent Sessions
            </h2>
            <p className="text-sm text-slate-300">Latest admin login activity</p>
          </div>
          
          <div className="p-6">
            {recentSessions.length > 0 ? (
              <div className="space-y-4">
                {recentSessions.slice(0, 5).map((session) => (
                  <div key={session.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white font-medium">
                        {formatDate(session.loginTime)}
                      </p>
                      <p className="text-xs text-slate-400">
                        {session.ipAddress} • Duration: {formatDuration(session.duration)}
                      </p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      session.logoutTime ? 'bg-slate-400' : 'bg-green-400'
                    }`}></div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">No recent sessions</p>
            )}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}