import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import User from "../database/Model/User";
import jwt from "jsonwebtoken";
import connectDB from "../database/db";


export async function POST(request) {
    try {

        await connectDB()

        const body = await request.json()
        const { Email, Password } = body



        if (!Email || !Password) {
            return NextResponse.json({ message: 'Email and password required' }, { status: 400 });
        }

        const TheUserArr = await User.find({ email:Email });

        if (TheUserArr.length<=0) {
            return NextResponse.json({ message: 'User Doesn`t exists' }, { status: 409 });
        }
        const requestedUser = TheUserArr[0]
       


        const passwordFromDb = requestedUser.password

        const isVerified = await bcrypt.compare(Password, passwordFromDb)

        console.log(isVerified)

        if (!isVerified) {
            return NextResponse.json({ message: "Wrong Password" }, { status: 401 })
        }

        const token = jwt.sign({ id: requestedUser._id }, process.env.JWT_TOKEN, { expiresIn: "7d" })

        const response = NextResponse.json({ message: 'Login successful' });

        response.cookies.set({
            name: 'token',
            value: token,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
        })

        return response
    }
    catch (error) {
        return NextResponse.json({
            message: "Error In Login"
        }, { status: 500 })
    }
}

export async function GET() {
    return NextResponse.json({ message: "Rohan ko Tauko" }, { status: 200 })
}