import connectDB from '@/app/api/database/db';
import Project from '@/app/api/database/Model/Project';
import User from '@/app/api/database/Model/User';
import { Authorize } from '@/app/api/functions/middleware';
import { NextResponse } from 'next/server';



export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const data = await Authorize(req);

    const me = await User.findById(data.user.id)


    if (!me.IsSuperAdmin) {
      return NextResponse.json({ message: "You are not Authorized" }, { status: 400 })
    }


    const deletedProject = await Project.findByIdAndDelete(params.id);

    if (!deletedProject) {
      return NextResponse.json(
        { error: 'Project not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Project deleted successfully.' },
      { status: 200 }
    );

  } catch (err) {
    console.error('[DELETE /api/projects/[id]] Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
