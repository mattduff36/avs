import { NextRequest, NextResponse } from 'next/server';
import { getMachines, getMachine, createMachine, updateMachine, deleteMachine, type Machine } from '@/lib/dynamic-content';
import { uploadImage, replaceImage } from '@/lib/blob-storage';

// GET: Fetch all machines or a specific machine
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const machine = await getMachine(id);
      if (!machine) {
        return NextResponse.json(
          { success: false, message: 'Machine not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: machine });
    }

    const machines = await getMachines();
    return NextResponse.json({ success: true, data: machines });
  } catch (error) {
    console.error('Error fetching machines:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch machines' },
      { status: 500 }
    );
  }
}

// POST: Create a new machine
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const features = JSON.parse(formData.get('features') as string || '[]');
    const side = formData.get('side') as 'left' | 'right';
    const forSale = formData.get('forSale') === 'true';
    const imageFile = formData.get('image') as File | null;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Create machine first to get ID
    const machineData: Omit<Machine, 'id' | 'createdAt' | 'updatedAt'> = {
      title,
      description,
      features,
      side: side || 'left',
      forSale: forSale || false,
    };

    const newMachine = await createMachine(machineData);

    // Upload image if provided
    if (imageFile) {
      const uploadResult = await uploadImage(imageFile, 'machines', newMachine.id);
      await updateMachine(newMachine.id, { image: uploadResult.url });
      newMachine.image = uploadResult.url;
    }

    return NextResponse.json({
      success: true,
      message: 'Machine created successfully',
      data: newMachine
    });
  } catch (error) {
    console.error('Error creating machine:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create machine' },
      { status: 500 }
    );
  }
}

// PUT: Update an existing machine
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const features = JSON.parse(formData.get('features') as string || '[]');
    const side = formData.get('side') as 'left' | 'right';
    const forSale = formData.get('forSale') === 'true';
    const imageFile = formData.get('image') as File | null;
    const removeImage = formData.get('removeImage') === 'true';

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Machine ID is required' },
        { status: 400 }
      );
    }

    const existingMachine = await getMachine(id);
    if (!existingMachine) {
      return NextResponse.json(
        { success: false, message: 'Machine not found' },
        { status: 404 }
      );
    }

    const updates: Partial<Omit<Machine, 'id' | 'createdAt'>> = {};
    
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (features) updates.features = features;
    if (side) updates.side = side;
    if (forSale !== undefined) updates.forSale = forSale;

    // Handle image updates
    if (removeImage) {
      updates.image = undefined;
    } else if (imageFile) {
      const uploadResult = await replaceImage(existingMachine.image, imageFile, 'machines', id);
      updates.image = uploadResult.url;
    }

    const updatedMachine = await updateMachine(id, updates);

    return NextResponse.json({
      success: true,
      message: 'Machine updated successfully',
      data: updatedMachine
    });
  } catch (error) {
    console.error('Error updating machine:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update machine' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a machine
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Machine ID is required' },
        { status: 400 }
      );
    }

    const deleted = await deleteMachine(id);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Machine not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Machine deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting machine:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete machine' },
      { status: 500 }
    );
  }
}
