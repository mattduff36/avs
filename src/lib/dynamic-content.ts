import { getFromStorage, setInStorage } from './storage';
import { deleteImage } from './blob-storage';
import { logAdminChange } from './admin-activity';

// Base interfaces
export interface BaseItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Machine extends BaseItem {
  features: string[];
  side: 'left' | 'right';
  forSale: boolean;
}

export interface Service extends BaseItem {
  fullDescription: string;
  features: string[];
  icon: string;
}

export interface Project extends BaseItem {
  client: string;
  completedDate: string;
  category: string;
  tags: string[];
}

// Storage interfaces
export interface MachinesData {
  machines: Record<string, Machine>;
  lastUpdated: string;
  version: string;
}

export interface ServicesData {
  services: Record<string, Service>;
  lastUpdated: string;
  version: string;
}

export interface ProjectsData {
  projects: Record<string, Project>;
  lastUpdated: string;
  version: string;
}

// Default data
const defaultMachinesData: MachinesData = {
  machines: {},
  lastUpdated: new Date().toISOString(),
  version: '1.0'
};

const defaultServicesData: ServicesData = {
  services: {},
  lastUpdated: new Date().toISOString(),
  version: '1.0'
};

const defaultProjectsData: ProjectsData = {
  projects: {},
  lastUpdated: new Date().toISOString(),
  version: '1.0'
};

// Machines CRUD operations
export async function getMachines(): Promise<Machine[]> {
  const data = await getFromStorage<MachinesData>('dynamic-machines', defaultMachinesData);
  return Object.values(data.machines);
}

export async function getMachine(id: string): Promise<Machine | null> {
  const data = await getFromStorage<MachinesData>('dynamic-machines', defaultMachinesData);
  return data.machines[id] || null;
}

export async function createMachine(machine: Omit<Machine, 'id' | 'createdAt' | 'updatedAt'>): Promise<Machine> {
  const data = await getFromStorage<MachinesData>('dynamic-machines', defaultMachinesData);
  
  const newMachine: Machine = {
    ...machine,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  data.machines[newMachine.id] = newMachine;
  data.lastUpdated = new Date().toISOString();
  
  await setInStorage('dynamic-machines', data);
  await logAdminChange('create', `Machine "${newMachine.title}" created`, 'machines', newMachine.id);
  
  return newMachine;
}

export async function updateMachine(id: string, updates: Partial<Omit<Machine, 'id' | 'createdAt'>>): Promise<Machine | null> {
  const data = await getFromStorage<MachinesData>('dynamic-machines', defaultMachinesData);
  
  if (!data.machines[id]) {
    return null;
  }

  data.machines[id] = {
    ...data.machines[id],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  data.lastUpdated = new Date().toISOString();
  await setInStorage('dynamic-machines', data);
  await logAdminChange('update', `Machine "${data.machines[id].title}" updated`, 'machines', id);
  
  return data.machines[id];
}

export async function deleteMachine(id: string): Promise<boolean> {
  const data = await getFromStorage<MachinesData>('dynamic-machines', defaultMachinesData);
  
  if (!data.machines[id]) {
    return false;
  }

  const machine = data.machines[id];
  
  // Delete associated image from blob storage
  if (machine.image) {
    await deleteImage(machine.image);
  }

  delete data.machines[id];
  data.lastUpdated = new Date().toISOString();
  
  await setInStorage('dynamic-machines', data);
  await logAdminChange('delete', `Machine "${machine.title}" deleted`, 'machines', id);
  
  return true;
}

// Services CRUD operations
export async function getServices(): Promise<Service[]> {
  const data = await getFromStorage<ServicesData>('dynamic-services', defaultServicesData);
  return Object.values(data.services);
}

export async function getService(id: string): Promise<Service | null> {
  const data = await getFromStorage<ServicesData>('dynamic-services', defaultServicesData);
  return data.services[id] || null;
}

export async function createService(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
  const data = await getFromStorage<ServicesData>('dynamic-services', defaultServicesData);
  
  const newService: Service = {
    ...service,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  data.services[newService.id] = newService;
  data.lastUpdated = new Date().toISOString();
  
  await setInStorage('dynamic-services', data);
  await logAdminChange('create', `Service "${newService.title}" created`, 'services', newService.id);
  
  return newService;
}

export async function updateService(id: string, updates: Partial<Omit<Service, 'id' | 'createdAt'>>): Promise<Service | null> {
  const data = await getFromStorage<ServicesData>('dynamic-services', defaultServicesData);
  
  if (!data.services[id]) {
    return null;
  }

  data.services[id] = {
    ...data.services[id],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  data.lastUpdated = new Date().toISOString();
  await setInStorage('dynamic-services', data);
  await logAdminChange('update', `Service "${data.services[id].title}" updated`, 'services', id);
  
  return data.services[id];
}

export async function deleteService(id: string): Promise<boolean> {
  const data = await getFromStorage<ServicesData>('dynamic-services', defaultServicesData);
  
  if (!data.services[id]) {
    return false;
  }

  const service = data.services[id];
  
  // Delete associated image from blob storage
  if (service.image) {
    await deleteImage(service.image);
  }

  delete data.services[id];
  data.lastUpdated = new Date().toISOString();
  
  await setInStorage('dynamic-services', data);
  await logAdminChange('delete', `Service "${service.title}" deleted`, 'services', id);
  
  return true;
}

// Projects CRUD operations
export async function getProjects(): Promise<Project[]> {
  const data = await getFromStorage<ProjectsData>('dynamic-projects', defaultProjectsData);
  return Object.values(data.projects);
}

export async function getProject(id: string): Promise<Project | null> {
  const data = await getFromStorage<ProjectsData>('dynamic-projects', defaultProjectsData);
  return data.projects[id] || null;
}

export async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
  const data = await getFromStorage<ProjectsData>('dynamic-projects', defaultProjectsData);
  
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  data.projects[newProject.id] = newProject;
  data.lastUpdated = new Date().toISOString();
  
  await setInStorage('dynamic-projects', data);
  await logAdminChange('create', `Project "${newProject.title}" created`, 'projects', newProject.id);
  
  return newProject;
}

export async function updateProject(id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<Project | null> {
  const data = await getFromStorage<ProjectsData>('dynamic-projects', defaultProjectsData);
  
  if (!data.projects[id]) {
    return null;
  }

  data.projects[id] = {
    ...data.projects[id],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  data.lastUpdated = new Date().toISOString();
  await setInStorage('dynamic-projects', data);
  await logAdminChange('update', `Project "${data.projects[id].title}" updated`, 'projects', id);
  
  return data.projects[id];
}

export async function deleteProject(id: string): Promise<boolean> {
  const data = await getFromStorage<ProjectsData>('dynamic-projects', defaultProjectsData);
  
  if (!data.projects[id]) {
    return false;
  }

  const project = data.projects[id];
  
  // Delete associated image from blob storage
  if (project.image) {
    await deleteImage(project.image);
  }

  delete data.projects[id];
  data.lastUpdated = new Date().toISOString();
  
  await setInStorage('dynamic-projects', data);
  await logAdminChange('delete', `Project "${project.title}" deleted`, 'projects', id);
  
  return true;
}
