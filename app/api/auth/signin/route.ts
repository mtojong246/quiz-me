import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const data = await req.json();
    const { email, password } = data;

    const dbUser = await prisma.user.findFirst({
        where: { email }
    });

    if(!dbUser) return NextResponse.json({ errorMessage: 'No account exists' }, { status: 404 });

    const isMatch = await bcrypt.compare(password, dbUser.password)

    if (isMatch) {
        return NextResponse.json({
            username: dbUser.username,
            email: dbUser.email,
        }, {status: 200})
        
    }

    return NextResponse.json({ errorMessage: "Email or password is invalid" }, { status: 400 });
}