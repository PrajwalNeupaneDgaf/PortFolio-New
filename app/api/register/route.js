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
        if (Password.length < 8) {
            return NextResponse.json({ message: ' password Should Be * character Minimum' }, { status: 400 });
        }

        const existingUser = await User.findOne({ Email });

        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        let pin = Math.random() * 9999 + 1000

        pin = Math.floor(pin)


        //mail will be sent Here




        // Create user
        const newUser = new User({
            email: Email,
            password: hashedPassword,
            VerificationCode: pin
        });

        await newUser.save()





        const token = jwt.sign({
            id: newUser._id
        }, process.env.JWT_TOKEN, {
            expiresIn: "7d"
        })

        const response = NextResponse.json({ message: 'Register  successful' });

        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
        })

        return response
    }
    catch (error) {
        return NextResponse.json({
            message: "Error In register",
            error: error
        }, { status: 500 })
    }
}