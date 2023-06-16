import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import validator from 'validator';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const data = await req.json();
    const { username, email, password } = data;

    const errors: string[] = [];
    
    const validationSchema = [
        {
            valid: validator.isLength(username, { min: 1 }),
            errorMessage: 'Username is invalid'
        },
        {
            valid: validator.isEmail(email),
            errorMessage: 'Email is invalid'
        },
    ]

    validationSchema.forEach(check => {
        if(!check.valid) {
            errors.push(check.errorMessage)
        } 
    })

    if(errors.length) return NextResponse.json({errorMessage: errors[0]}, {status: 400})

    const userWithEmail = await prisma.user.findUnique({
        where: { email }
    })

    if (userWithEmail) return NextResponse.json({errorMessage: 'Email is associated with another account'}, {status: 400});

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: { username, email, password: hashedPassword }
    })

    return NextResponse.json({
        username: newUser.username,
        email: newUser.email,
    }, {status: 200})
}