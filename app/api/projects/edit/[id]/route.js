import connectDB from '@/app/api/database/db';
import Project from '@/app/api/database/Model/Project';
import User from '@/app/api/database/Model/User';
import { Authorize } from '@/app/api/functions/middleware';
import { NextResponse } from 'next/server';


export async function PUT(req, { params }) {
    await connectDB();

    const { id } = params;

    try {

        const data = await Authorize(req)

       const me = await User.findById(data.user.id)
       
       
           if(!me.IsSuperAdmin){
               return NextResponse.json({message:"You are not Authorized"},{status:400})
           }
        const body = await req.json();
        const {
            name,
            description,
            techStacks,
            demoLink,
            githubLink,
            imageUrl,
        } = body;

        if (!name || !description) {
            return NextResponse.json(
                { error: 'Project name and description are required.' },
                { status: 400 }
            );
        }

        const res = await Project.findByIdAndUpdate(id,body)

        return NextResponse.json({
            message:'Updated'
        })


    }
    catch (error) {
        console.error('[POST /api/projects/edit] Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}