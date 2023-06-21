import { PrismaClient } from "@prisma/client";
import { DeckType } from "@/app/create-set/components/Card";
import { NextResponse } from "next/server";
import { UserType } from "@/app/context/AuthContext";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const d = await req.json();

    const { deck, data }: { deck: DeckType, data: UserType } = d;

    const user = await prisma.user.findUnique({
        where: { email: data?.email },
        select: { id: true }
    })

    if(!user) return NextResponse.json({errorMessage: 'Cannot find user associated with deck'}, {status: 404});

    const newDeck = await prisma.deck.create({
        data: {
            title: deck.title,
            description: deck.description,
            user_id: user?.id,
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
            user: true,
            folder: true,
         }
    })

    if (!newDeckWithCards) return NextResponse.json({errorMessage: 'Cannot find updated deck'}, {status: 404});

    return NextResponse.json(newDeckWithCards);
    
}