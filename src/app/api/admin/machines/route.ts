import { NextRequest, NextResponse } from 'next/server';
import { 
  getMachinesWithSaleStatus, 
  updateMachineSaleStatus,
  getMachinesForSale,
  hasMachinesForSale,
  updateMachineEditableData
} from '@/lib/machines-data';
import { logAdminChange } from '@/lib/admin-activity';

// GET: Retrieve all machines with sale status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const forSaleOnly = searchParams.get('forSale') === 'true';
    
    let machines;
    if (forSaleOnly) {
      machines = await getMachinesForSale();
    } else {
      machines = await getMachinesWithSaleStatus();
    }
    
    return NextResponse.json({
      success: true,
      data: machines,
      count: machines.length
    });
  } catch (error) {
    console.error('Error fetching machines:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch machines',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST: Update machine sale status or editable content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { machineId, forSale, description, features } = body;

    // Validate machineId
    if (typeof machineId !== 'number') {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid input: machineId must be a number' 
        },
        { status: 400 }
      );
    }

    // Handle sale status update
    if (forSale !== undefined) {
      if (typeof forSale !== 'boolean') {
        return NextResponse.json(
          { 
            success: false,
            message: 'Invalid input: forSale must be a boolean' 
          },
          { status: 400 }
        );
      }

      await updateMachineSaleStatus(machineId, forSale);

      // Log the change
      const machines = await getMachinesWithSaleStatus();
      const machine = machines.find(m => m.id === machineId);
      const machineName = machine ? machine.title : `Machine ${machineId}`;
      
      await logAdminChange(
        forSale ? 'mark_for_sale' : 'remove_from_sale',
        `${machineName} ${forSale ? 'marked as for sale' : 'removed from sale'}`,
        'machines',
        machineId
      );

      const updatedMachines = await getMachinesWithSaleStatus();
      const hasAnyForSale = await hasMachinesForSale();

      return NextResponse.json({
        success: true,
        message: `Machine ${machineId} ${forSale ? 'marked as for sale' : 'removed from sale'}`,
        data: {
          machineId,
          forSale,
          updatedMachines,
          hasAnyForSale
        }
      });
    }

    // Handle editable content update
    if (description !== undefined || features !== undefined) {
      if (description !== undefined && typeof description !== 'string') {
        return NextResponse.json(
          { 
            success: false,
            message: 'Invalid input: description must be a string' 
          },
          { status: 400 }
        );
      }

      if (features !== undefined && (!Array.isArray(features) || !features.every(f => typeof f === 'string'))) {
        return NextResponse.json(
          { 
            success: false,
            message: 'Invalid input: features must be an array of strings' 
          },
          { status: 400 }
        );
      }

      // Get current machine data
      const machines = await getMachinesWithSaleStatus();
      const currentMachine = machines.find(m => m.id === machineId);
      
      if (!currentMachine) {
        return NextResponse.json(
          { 
            success: false,
            message: 'Machine not found' 
          },
          { status: 404 }
        );
      }

      // Update with provided values or keep current ones
      const updatedDescription = description !== undefined ? description : currentMachine.description;
      const updatedFeatures = features !== undefined ? features : currentMachine.features;

      await updateMachineEditableData(machineId, updatedDescription, updatedFeatures);

      // Log the change
      const machineName = currentMachine.title;
      const changes = [];
      if (description !== undefined) changes.push('description');
      if (features !== undefined) changes.push('features');
      
      await logAdminChange(
        'update_content',
        `${machineName} ${changes.join(' and ')} updated`,
        'machines',
        machineId
      );

      const updatedMachines = await getMachinesWithSaleStatus();

      return NextResponse.json({
        success: true,
        message: `Machine ${machineId} content updated`,
        data: {
          machineId,
          description: updatedDescription,
          features: updatedFeatures,
          updatedMachines
        }
      });
    }

    return NextResponse.json(
      { 
        success: false,
        message: 'No valid update parameters provided' 
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating machine:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update machine',
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
