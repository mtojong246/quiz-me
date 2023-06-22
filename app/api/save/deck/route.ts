import { PrismaClient } from "@prisma/client";
import { DeckType } from "@/app/create-set/page";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const d = await req.json();

    const { deck, id }: { deck: DeckType, id: number } = d;

    const newDeck = await prisma.deck.create({
        data: {
            title: deck.title,
            description: deck.description,
            user_id: id,
        }
    })

    const newCards = deck.cards.map(card => {
        return {
            term: card.term,
            definition: card.definition,
            deck_id: newDeck.id,
        }
    })

    await prisma.card.createMany({
        data: newCards,
    })

    const newDeckWithCards = await prisma.deck.findUnique({
        where: { id: newDeck.id },
        select: { 
            id: true,
            title: true,
            description: true,
            cards: true,
         }
    })

    if (!newDeckWithCards) return NextResponse.json({errorMessage: 'Cannot find updated deck'}, {status: 404});

    return NextResponse.json(newDeckWithCards);
    
}