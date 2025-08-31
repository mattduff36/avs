import { getFromStorage, setInStorage } from './storage';

export interface EditableContent {
  hero?: {
    title: string;
    subtitle: string;
  };
  story?: {
    heading: string;
    paragraphs: string[];
  };
  accreditations?: {
    heading: string;
    description: string;
  };
  projects?: Record<string, Record<string, unknown>>;
  [key: string]: unknown; // Allow for additional dynamic content
}

export interface PageContent {
  about: EditableContent;
  services: EditableContent;
  projects: EditableContent;
}

export interface ContentData {
  pages: PageContent;
  lastUpdated: string | null;
  version: string;
}

// Storage key
const CONTENT_DATA_KEY = 'content-data';

// Default content structure
const defaultContentData: ContentData = {
  pages: {
    about: {
      story: {
        heading: "Our Story",
        paragraphs: [
          "A&V Squires Plant Co Limited has been serving the construction industry for over 50 years, establishing ourselves as one of the East Midlands' leading plant hire, civil engineering, and contract earthmoving companies.",
          "Founded in 1971, we have built our reputation on delivering high-quality, efficient, and reliable construction services to customers nationwide. Our commitment to excellence and customer satisfaction has been the cornerstone of our success.",
          "Through decades of experience, we have developed extensive expertise in all aspects of construction and civil engineering. Our skilled team and modern fleet of equipment enable us to tackle projects of any size and complexity."
        ]
      }
    },
    services: {
      hero: {
        title: "Our Services",
        subtitle: "Comprehensive construction and civil engineering solutions"
      },
      accreditations: {
        heading: "Quality Assurance",
        description: "We maintain the highest standards of quality and safety in all our operations."
      }
    },
    projects: {
      hero: {
        title: "Our Projects",
        subtitle: "From small-scale works to multi-million pound developments"
      }
    }
  },
  lastUpdated: null,
  version: "1.0"
};

/**
 * Reads the content data from storage
 */
export async function readContentData(): Promise<ContentData> {
  return await getFromStorage(CONTENT_DATA_KEY, defaultContentData);
}

/**
 * Writes the content data to storage
 */
export async function writeContentData(data: ContentData): Promise<void> {
  // Update timestamp
  data.lastUpdated = new Date().toISOString();
  
  await setInStorage(CONTENT_DATA_KEY, data);
}

/**
 * Updates content for the About page
 */
export async function updateAboutContent(updates: Partial<EditableContent>): Promise<EditableContent> {
  const data = await readContentData();
  
  data.pages.about = {
    ...data.pages.about,
    ...updates
  };
  
  await writeContentData(data);
  return data.pages.about;
}

/**
 * Updates content for the Services page
 */
export async function updateServicesContent(updates: Partial<EditableContent>): Promise<EditableContent> {
  const data = await readContentData();
  
  data.pages.services = {
    ...data.pages.services,
    ...updates
  };
  
  await writeContentData(data);
  return data.pages.services;
}

/**
 * Updates content for the Projects page
 */
export async function updateProjectsContent(updates: Partial<EditableContent>): Promise<EditableContent> {
  const data = await readContentData();
  
  data.pages.projects = {
    ...data.pages.projects,
    ...updates
  };
  
  await writeContentData(data);
  return data.pages.projects;
}

/**
 * Updates content for a specific project
 */
export async function updateProject(projectId: string, updates: Record<string, unknown>): Promise<void> {
  const data = await readContentData();
  
  if (!data.pages.projects.projects) {
    data.pages.projects.projects = {};
  }
  
  data.pages.projects.projects[projectId] = {
    ...data.pages.projects.projects[projectId],
    ...updates
  };
  
  await writeContentData(data);
}

/**
 * Adds a new project
 */
export async function addProject(projectData: Record<string, unknown>): Promise<void> {
  const data = await readContentData();
  
  if (!data.pages.projects.projects) {
    data.pages.projects.projects = {};
  }
  
  const projectId = `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  data.pages.projects.projects[projectId] = projectData;
  
  await writeContentData(data);
}

/**
 * Deletes a project
 */
export async function deleteProject(projectId: string): Promise<void> {
  const data = await readContentData();
  
  if (data.pages.projects.projects && data.pages.projects.projects[projectId]) {
    delete data.pages.projects.projects[projectId];
    await writeContentData(data);
  }
}

/**
 * Gets content for a specific page
 */
export async function getPageContent(page: keyof PageContent): Promise<EditableContent> {
  const data = await readContentData();
  return data.pages[page] || {};
}

/**
 * Updates content for a specific page
 */
export async function updatePageContent(page: keyof PageContent, updates: Partial<EditableContent>): Promise<EditableContent> {
  switch (page) {
    case 'about':
      return await updateAboutContent(updates);
    case 'services':
      return await updateServicesContent(updates);
    case 'projects':
      return await updateProjectsContent(updates);
    default:
      throw new Error(`Unknown page: ${page}`);
  }
}