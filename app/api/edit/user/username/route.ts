import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    const d = await req.json();

    const { username, password, id } = d;

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
        data: { username },
        select: {  
            id: true,
            username: true,
            email: true,
        }
    })

    if (!updatedUser) return NextResponse.json({ errorMessage: 'Error retrieving updated user information' }, { status: 400 });

    return NextResponse.json(updatedUser);
}