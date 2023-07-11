import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { verifyJwt } from "@/jwt";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    const accessToken = req.headers.get('Authorization');

    if (!accessToken || !verifyJwt(accessToken)) return NextResponse.json({ errorMessage: "Unauthorized request" }, { status: 401 });

    const d = await req.json();

    const { email, password, id } = d;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    })

    if (existingUser) return NextResponse.json({ errorMessage: 'Email is associated with an existing account' }, { status: 400 });

    const dbUser = await prisma.user.findFirst({
        where: { id },
        select: {
            id: true,
            username: true,
            email: true,
            password: true,
        }
    })

    if(!dbUser) return NextResponse.json({ errorMessage: 'Error finding user account' }, { status: 404 });

    const isMatch = await bcrypt.compare(password, dbUser.password);

    if (!isMatch) return NextResponse.json({ errorMessage: 'Password is invalid' }, { status: 400 });

    const updatedUser = await prisma.user.update({
        where: { id },
        data: { email },
        select: {  
            id: true,
            username: true,
            email: true,
        }
    })

    if (!updatedUser) return NextResponse.json({ errorMessage: 'Error retrieving updated user information' }, { status: 400 });

    return NextResponse.json(updatedUser);
}