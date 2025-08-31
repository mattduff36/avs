import { NextRequest, NextResponse } from 'next/server';
import { 
  getRecentSessions,
  getRecentChanges,
  getAdminStats,
  logAdminChange
} from '@/lib/admin-activity';

// GET: Retrieve admin activity data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    switch (type) {
      case 'sessions':
        const sessions = await getRecentSessions(limit);
        return NextResponse.json({
          success: true,
          data: sessions
        });
      
      case 'changes':
        const changes = await getRecentChanges(limit);
        return NextResponse.json({
          success: true,
          data: changes
        });
      
      case 'stats':
        const stats = await getAdminStats();
        return NextResponse.json({
          success: true,
          data: stats
        });
      
      default:
        // Return all activity data
        const [allSessions, allChanges, allStats] = await Promise.all([
          getRecentSessions(10),
          getRecentChanges(20),
          getAdminStats()
        ]);
        
        return NextResponse.json({
          success: true,
          data: {
            sessions: allSessions,
            changes: allChanges,
            stats: allStats
          }
        });
    }
  } catch (error) {
    console.error('Error fetching admin activity:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch admin activity',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST: Log an admin change
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, details, section, itemId } = body;

    // Validate required fields
    if (!action || !details || !section) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Missing required fields: action, details, section' 
        },
        { status: 400 }
      );
    }

    await logAdminChange(action, details, section, itemId);

    return NextResponse.json({
      success: true,
      message: 'Change logged successfully'
    });
  } catch (error) {
    console.error('Error logging admin change:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to log admin change',
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
