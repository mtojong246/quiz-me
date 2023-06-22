import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { id }: { id: number } = await req.json();

    const deckData = await prisma.deck.findMany({
        where: { user_id: id },
        select: {
            id: true,
            title: true,
            description: true, 
            cards: true,
        }
    })

    if (!deckData) return NextResponse.json({ errorMessage: "Unable to retrieve decks" }, { status: 404 });

    return NextResponse.json(deckData);
}