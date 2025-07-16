import { NextResponse } from 'next/server';
import connectDB from '../../database/db';
import Project from '../../database/Model/Project';
import { Authorize } from '../../functions/middleware';
import User from '../../database/Model/User';


export async function POST(req) {
  await connectDB(); 
  try {
    const data = await Authorize(req)

    const me = await User.findById(data.user.id)

    if(!me.IsSuperAdmin){
        return NextResponse.json({message:"You are not Authorized"},{status:400})
    }

  
    const body = await req.json();

    const { name, description, techStacks, demoLink, githubLink, imageUrl } = body;

    // Basic validation
    if (!name || !description) {
      return NextResponse.json(
        { error: 'Project name and description are required.' },
        { status: 400 }
      );
    }

    const newProject = new Project({
      name: name.trim(),
      description: description.trim(),
      techStacks: Array.isArray(techStacks) ? techStacks : [],
      demoLink: demoLink?.trim() || '',
      githubLink: githubLink?.trim() || '',
      imageUrl: imageUrl?.trim() || '',
    });

    const saved = await newProject.save();

    return NextResponse.json(
      { message: 'Project created successfully', data: saved },
      { status: 201 }
    );

  } catch (err) {
    console.error('[POST /api/projects] Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
