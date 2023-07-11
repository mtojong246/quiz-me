import { signJwtAccessToken } from "@/jwt";
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
            id: true,
            username: true,
            email: true,
            password: true,
        }
    });


    if(!dbUser) return NextResponse.json({ errorMessage: 'No account exists' }, { status: 404 });

    const isMatch = await bcrypt.compare(password, dbUser.password)

    if (isMatch) {
        const userWithoutPassword = {
            id: dbUser.id,
            username: dbUser.username,
            email: dbUser.email,
        }
        const accessToken = signJwtAccessToken(userWithoutPassword);
        const result = {
            ...userWithoutPassword,
            accessToken
        }
        return NextResponse.json(result, {status: 200})
        
    }

    return NextResponse.json({ errorMessage: "Email or password is invalid" }, { status: 400 });
}