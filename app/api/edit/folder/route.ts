import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const d = await req.json();

    const { id, deck_id }: { id: number, deck_id: number } = d;

    const updatedDeck = await prisma.deck.update({
        where: { id: deck_id },
        data: { folder_id: id },
        select: { 
            id: true,
            title: true,
            description: true, 
            cards: true,
            folder_id: true, 
        }
    })

    if (!updatedDeck) return NextResponse.json({ errorMessage: 'Error updating deck' }, { status: 400 });

    return NextResponse.json(updatedDeck);
}

export async function PUT(req: Request) {
    const d = await req.json();

    const { deck_id }: { deck_id: number } = d;

    const updatedDeck = await prisma.deck.update({
        where: { id: deck_id },
        data: { folder_id: null },
        select: { 
            id: true,
            title: true,
            description: true, 
            cards: true,
            folder_id: true, 
        }
    })

    if (!updatedDeck) return NextResponse.json({ errorMessage: 'Error updating deck' }, { status: 400 });

    return NextResponse.json(updatedDeck);
}