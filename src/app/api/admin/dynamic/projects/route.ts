import { NextRequest, NextResponse } from 'next/server';
import { getProjects, getProject, createProject, updateProject, deleteProject, type Project } from '@/lib/dynamic-content';
import { uploadImage, replaceImage } from '@/lib/blob-storage';

// GET: Fetch all projects or a specific project
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const project = await getProject(id);
      if (!project) {
        return NextResponse.json(
          { success: false, message: 'Project not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: project });
    }

    const projects = await getProjects();
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST: Create a new project
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const client = formData.get('client') as string;
    const completedDate = formData.get('completedDate') as string;
    const category = formData.get('category') as string;
    const tags = JSON.parse(formData.get('tags') as string || '[]');
    const imageFile = formData.get('image') as File | null;

    if (!title || !description || !client) {
      return NextResponse.json(
        { success: false, message: 'Title, description, and client are required' },
        { status: 400 }
      );
    }

    // Create project first to get ID
    const projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> = {
      title,
      description,
      client,
      completedDate: completedDate || new Date().toISOString().split('T')[0],
      category: category || 'General',
      tags,
    };

    const newProject = await createProject(projectData);

    // Upload image if provided
    if (imageFile) {
      const uploadResult = await uploadImage(imageFile, 'projects', newProject.id);
      await updateProject(newProject.id, { image: uploadResult.url });
      newProject.image = uploadResult.url;
    }

    return NextResponse.json({
      success: true,
      message: 'Project created successfully',
      data: newProject
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create project' },
      { status: 500 }
    );
  }
}

// PUT: Update an existing project
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const client = formData.get('client') as string;
    const completedDate = formData.get('completedDate') as string;
    const category = formData.get('category') as string;
    const tags = JSON.parse(formData.get('tags') as string || '[]');
    const imageFile = formData.get('image') as File | null;
    const removeImage = formData.get('removeImage') === 'true';

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Project ID is required' },
        { status: 400 }
      );
    }

    const existingProject = await getProject(id);
    if (!existingProject) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    const updates: Partial<Omit<Project, 'id' | 'createdAt'>> = {};
    
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (client) updates.client = client;
    if (completedDate) updates.completedDate = completedDate;
    if (category) updates.category = category;
    if (tags) updates.tags = tags;

    // Handle image updates
    if (removeImage) {
      updates.image = undefined;
    } else if (imageFile) {
      const uploadResult = await replaceImage(existingProject.image, imageFile, 'projects', id);
      updates.image = uploadResult.url;
    }

    const updatedProject = await updateProject(id, updates);

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a project
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Project ID is required' },
        { status: 400 }
      );
    }

    const deleted = await deleteProject(id);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
