import { NextRequest, NextResponse } from 'next/server';
import { 
  getMachinesWithSaleStatus, 
  updateMachineSaleStatus,
  getMachinesForSale,
  hasMachinesForSale
} from '@/lib/machines-data';

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

// POST: Update machine sale status
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { machineId, forSale } = body;

    // Validate input
    if (typeof machineId !== 'number' || typeof forSale !== 'boolean') {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid input: machineId must be a number and forSale must be a boolean' 
        },
        { status: 400 }
      );
    }

    // Update machine sale status
    await updateMachineSaleStatus(machineId, forSale);

    // Get updated data
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
  } catch (error) {
    console.error('Error updating machine sale status:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update machine sale status',
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
