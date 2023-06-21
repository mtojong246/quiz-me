import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const data = await req.json();
    const { email, password } = data;

    const dbUser = await prisma.user.findUnique({
        where: { email },
        select: {
            username: true,
            email: true,
            password: true,
            decks: true,
            folders: true,
        }
    });


    if(!dbUser) return NextResponse.json({ errorMessage: 'No account exists' }, { status: 404 });

    const isMatch = await bcrypt.compare(password, dbUser.password)

    if (isMatch) {
        return NextResponse.json({
            username: dbUser.username,
            email: dbUser.email,
            decks: dbUser.decks,
            folders: dbUser.folders,
        }, {status: 200})
        
    }

    return NextResponse.json({ errorMessage: "Email or password is invalid" }, { status: 400 });
}