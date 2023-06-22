import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { email }: { email: string } = await req.json();

    const userData = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            username: true,
            email: true,
            decks: true,
            folders: true,
        }
    })

    if (!userData) return NextResponse.json({ errorMessage: 'Cannot find user data' }, { status: 404 });

    return NextResponse.json(userData);
}