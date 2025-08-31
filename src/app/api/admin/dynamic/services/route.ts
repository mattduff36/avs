import { NextRequest, NextResponse } from 'next/server';
import { getServices, getService, createService, updateService, deleteService, type Service } from '@/lib/dynamic-content';
import { uploadImage, replaceImage } from '@/lib/blob-storage';

// GET: Fetch all services or a specific service
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const service = await getService(id);
      if (!service) {
        return NextResponse.json(
          { success: false, message: 'Service not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: service });
    }

    const services = await getServices();
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST: Create a new service
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const fullDescription = formData.get('fullDescription') as string;
    const features = JSON.parse(formData.get('features') as string || '[]');
    const icon = formData.get('icon') as string;
    const imageFile = formData.get('image') as File | null;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Create service first to get ID
    const serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'> = {
      title,
      description,
      fullDescription: fullDescription || description,
      features,
      icon: icon || 'Wrench',
    };

    const newService = await createService(serviceData);

    // Upload image if provided
    if (imageFile) {
      const uploadResult = await uploadImage(imageFile, 'services', newService.id);
      await updateService(newService.id, { image: uploadResult.url });
      newService.image = uploadResult.url;
    }

    return NextResponse.json({
      success: true,
      message: 'Service created successfully',
      data: newService
    });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create service' },
      { status: 500 }
    );
  }
}

// PUT: Update an existing service
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const fullDescription = formData.get('fullDescription') as string;
    const features = JSON.parse(formData.get('features') as string || '[]');
    const icon = formData.get('icon') as string;
    const imageFile = formData.get('image') as File | null;
    const removeImage = formData.get('removeImage') === 'true';

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Service ID is required' },
        { status: 400 }
      );
    }

    const existingService = await getService(id);
    if (!existingService) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }

    const updates: Partial<Omit<Service, 'id' | 'createdAt'>> = {};
    
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (fullDescription) updates.fullDescription = fullDescription;
    if (features) updates.features = features;
    if (icon) updates.icon = icon;

    // Handle image updates
    if (removeImage) {
      updates.image = undefined;
    } else if (imageFile) {
      const uploadResult = await replaceImage(existingService.image, imageFile, 'services', id);
      updates.image = uploadResult.url;
    }

    const updatedService = await updateService(id, updates);

    return NextResponse.json({
      success: true,
      message: 'Service updated successfully',
      data: updatedService
    });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a service
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Service ID is required' },
        { status: 400 }
      );
    }

    const deleted = await deleteService(id);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
