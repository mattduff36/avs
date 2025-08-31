import { NextRequest, NextResponse } from 'next/server';
import { 
  readContentData,
  updateAboutContent,
  updateServicesContent,
  updateProjectsContent,
  updateProject,
  addProject,
  deleteProject
} from '@/lib/content-data';

// GET: Retrieve all content data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    
    const data = await readContentData();
    
    if (page && ['about', 'services', 'projects'].includes(page)) {
      return NextResponse.json({
        success: true,
        data: data.pages[page as keyof typeof data.pages]
      });
    }
    
    return NextResponse.json({
      success: true,
      data: data.pages
    });
  } catch (error) {
    console.error('Error fetching content data:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch content data',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST: Update content data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, updates, action, projectId, projectData } = body;

    // Validate page parameter
    if (!page || !['about', 'services', 'projects'].includes(page)) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid page parameter. Must be one of: about, services, projects' 
        },
        { status: 400 }
      );
    }

    // Handle project-specific actions
    if (page === 'projects' && action) {
      switch (action) {
        case 'updateProject':
          if (typeof projectId !== 'string' || !updates) {
            return NextResponse.json(
              { 
                success: false,
                message: 'Invalid parameters for updateProject action' 
              },
              { status: 400 }
            );
          }
          await updateProject(projectId, updates);
          break;

        case 'addProject':
          if (!projectData) {
            return NextResponse.json(
              { 
                success: false,
                message: 'Project data is required for addProject action' 
              },
              { status: 400 }
            );
          }
          const newProject = await addProject(projectData);
          const updatedData = await readContentData();
          return NextResponse.json({
            success: true,
            message: 'Project added successfully',
            data: {
              newProject,
              allProjects: updatedData.pages.projects.projects
            }
          });

        case 'deleteProject':
          if (typeof projectId !== 'string') {
            return NextResponse.json(
              { 
                success: false,
                message: 'Project ID is required for deleteProject action' 
              },
              { status: 400 }
            );
          }
          await deleteProject(projectId);
          break;

        default:
          return NextResponse.json(
            { 
              success: false,
              message: 'Invalid action for projects page' 
            },
            { status: 400 }
          );
      }
    } else {
      // Handle regular content updates
      if (!updates) {
        return NextResponse.json(
          { 
            success: false,
            message: 'Updates parameter is required' 
          },
          { status: 400 }
        );
      }

      switch (page) {
        case 'about':
          await updateAboutContent(updates);
          break;
        case 'services':
          await updateServicesContent(updates);
          break;
        case 'projects':
          await updateProjectsContent(updates);
          break;
      }
    }

    // Get updated data
    const updatedData = await readContentData();

    return NextResponse.json({
      success: true,
      message: `${page} page content updated successfully`,
      data: updatedData.pages[page as keyof typeof updatedData.pages]
    });
  } catch (error) {
    console.error('Error updating content data:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update content data',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Prevent other HTTP methods
export async function PUT() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}
