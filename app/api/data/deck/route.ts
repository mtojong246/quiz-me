import { verifyJwt } from "@/jwt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


const prisma = new PrismaClient();

export async function POST(req: Request) {
    const accessToken = req.headers.get('Authorization');

    if (!accessToken || !verifyJwt(accessToken)) return NextResponse.json({ errorMessage: "Unauthorized request" }, { status: 401 });

    const { id }: { id: number } = await req.json();

    const deckData = await prisma.deck.findMany({
        where: { user_id: id },
        select: {
            id: true,
            title: true,
            description: true,
            user_id: true,
            folder_id: true,
            created_at: true,
            updated_at: true,
            cards: true,
        }
    })

    if (!deckData) return NextResponse.json({ errorMessage: "Unable to retrieve decks" }, { status: 404 });

    return NextResponse.json(deckData);
}