import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const data = await req.json();

    const { email, username } = data;

    const existingUser = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            username: true,
            email: true,
        }
    })

    if (existingUser) {
        return NextResponse.json({
            id: existingUser.id,
            email: existingUser.email,
            username: existingUser.username,
        })
    }

    const newUser = await prisma.user.create({
        data: { username, email, password: 'google' },
        select: {
            id: true,
            username: true,
            email: true,
        }
    })

    if (!newUser) return NextResponse.json({ errorMessage: 'Error creating new user account' }, { status: 400 });

    return NextResponse.json(newUser);
}