import { NextResponse } from 'next/server';
import connectDB from '../database/db';
import Project from '../database/Model/Project';


// GET /api/projects — fetch all projects
export async function GET() {
  await connectDB();

  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json({ data: projects }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/projects] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
