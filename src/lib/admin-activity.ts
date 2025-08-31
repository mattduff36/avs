import { getFromStorage, setInStorage } from './storage';

export interface AdminSession {
  id: string;
  loginTime: string;
  logoutTime?: string;
  ipAddress?: string;
  userAgent?: string;
  duration?: number; // in minutes
}

export interface AdminChange {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  section: string; // 'machines', 'about', 'services', 'projects'
  itemId?: string | number;
}

export interface AdminActivityData {
  sessions: AdminSession[];
  changes: AdminChange[];
  lastUpdated: string | null;
  version: string;
}

// Storage key
const ADMIN_ACTIVITY_KEY = 'admin-activity';

/**
 * Reads the admin activity data from storage
 */
export async function readAdminActivity(): Promise<AdminActivityData> {
  const defaultData: AdminActivityData = {
    sessions: [],
    changes: [],
    lastUpdated: null,
    version: "1.0"
  };
  
  return await getFromStorage(ADMIN_ACTIVITY_KEY, defaultData);
}

/**
 * Writes the admin activity data to storage
 */
export async function writeAdminActivity(data: AdminActivityData): Promise<void> {
  // Update timestamp
  data.lastUpdated = new Date().toISOString();
  
  await setInStorage(ADMIN_ACTIVITY_KEY, data);
}

/**
 * Logs a new admin session
 */
export async function logAdminLogin(ipAddress?: string, userAgent?: string): Promise<string> {
  const data = await readAdminActivity();
  
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const session: AdminSession = {
    id: sessionId,
    loginTime: new Date().toISOString(),
    ipAddress,
    userAgent
  };
  
  data.sessions.unshift(session);
  
  // Keep only last 50 sessions
  if (data.sessions.length > 50) {
    data.sessions = data.sessions.slice(0, 50);
  }
  
  await writeAdminActivity(data);
  return sessionId;
}

/**
 * Logs admin logout
 */
export async function logAdminLogout(sessionId: string): Promise<void> {
  const data = await readAdminActivity();
  
  const sessionIndex = data.sessions.findIndex(s => s.id === sessionId);
  if (sessionIndex !== -1) {
    const session = data.sessions[sessionIndex];
    const loginTime = new Date(session.loginTime);
    const logoutTime = new Date();
    
    session.logoutTime = logoutTime.toISOString();
    session.duration = Math.round((logoutTime.getTime() - loginTime.getTime()) / (1000 * 60)); // minutes
    
    await writeAdminActivity(data);
  }
}

/**
 * Logs an admin change/action
 */
export async function logAdminChange(
  action: string,
  details: string,
  section: string,
  itemId?: string | number
): Promise<void> {
  const data = await readAdminActivity();
  
  const changeId = `change_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const change: AdminChange = {
    id: changeId,
    timestamp: new Date().toISOString(),
    action,
    details,
    section,
    itemId
  };
  
  data.changes.unshift(change);
  
  // Keep only last 100 changes
  if (data.changes.length > 100) {
    data.changes = data.changes.slice(0, 100);
  }
  
  await writeAdminActivity(data);
}

/**
 * Gets recent admin sessions (last 10)
 */
export async function getRecentSessions(limit: number = 10): Promise<AdminSession[]> {
  const data = await readAdminActivity();
  return data.sessions.slice(0, limit);
}

/**
 * Gets recent admin changes (last 20)
 */
export async function getRecentChanges(limit: number = 20): Promise<AdminChange[]> {
  const data = await readAdminActivity();
  return data.changes.slice(0, limit);
}

/**
 * Gets admin activity stats
 */
export async function getAdminStats(): Promise<{
  totalSessions: number;
  totalChanges: number;
  lastLogin?: string;
  averageSessionDuration?: number;
  changesThisWeek: number;
}> {
  const data = await readAdminActivity();
  
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const changesThisWeek = data.changes.filter(change => 
    new Date(change.timestamp) > oneWeekAgo
  ).length;
  
  const completedSessions = data.sessions.filter(s => s.duration !== undefined);
  const averageSessionDuration = completedSessions.length > 0
    ? Math.round(completedSessions.reduce((sum, s) => sum + (s.duration || 0), 0) / completedSessions.length)
    : undefined;
  
  return {
    totalSessions: data.sessions.length,
    totalChanges: data.changes.length,
    lastLogin: data.sessions[0]?.loginTime,
    averageSessionDuration,
    changesThisWeek
  };
}