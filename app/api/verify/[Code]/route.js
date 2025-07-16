import { NextResponse } from "next/server";
import connectDB from "../../database/db";
import { Authorize } from "../../functions/middleware";
import User from "../../database/Model/User";

export async function GET(request, { params }) {
    try {
        await connectDB()

        const { isAuthenticated, user } = await Authorize(request)

        const MyParams = await params

        const VerificationCode = MyParams.Code


        if (!isAuthenticated) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const requestedUser = await User.findById(user.id)

        if (!requestedUser) {
            return NextResponse.json({ message: "Token Didn`t Matched" }, { status: 500 })
        }


        if (requestedUser.VerificationCode != VerificationCode) {
            return NextResponse.json({ message: "Token Didn`t Matched" }, { status: 500 })
        }

        await User.findByIdAndUpdate(requestedUser._id, {
            IsVerified: true
        })

        return NextResponse.json({ message: "ID Verified" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error on Verifying Token" }, { status: 500 })
    }
}