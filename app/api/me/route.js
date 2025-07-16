import { NextResponse } from "next/server";
import { Authorize } from "../functions/middleware";
import User from "../database/Model/User";
import connectDB from "../database/db";

export async function GET(request) {
    try {

        await connectDB()
        const data= await Authorize(request)

       

        const user = await User.findById(data.user.id)

        return NextResponse.json({
            data:{
                IsVerified:user?.IsVerified
            },

        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error in the Authorization" },{status:500})
    }
}