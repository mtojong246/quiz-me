import { PrismaClient } from "@prisma/client";
import { DeckWithId } from "@/app/edit/[slug]/page";
import { NextResponse } from "next/server";
import { CardType } from "@/app/context/DeckContext";
import { verifyJwt } from "@/jwt";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    const accessToken = req.headers.get('Authorization');

    if (!accessToken || !verifyJwt(accessToken)) return NextResponse.json({ errorMessage: "Unauthorized request" }, { status: 401 });

    const d = await req.json();

    const { deck, user_id }: { deck: DeckWithId, user_id: number } = d;

    const { id, title, description, cards } = deck;

    const oldDeck = await prisma.deck.delete({
        where: { id },
    });

    if (!oldDeck) return NextResponse.json({ errorMessage: "Error deleting old deck" }, { status: 400 })

    const newDeck = await prisma.deck.create({
        data: { title, description, user_id }
    });

    if (!newDeck) return NextResponse.json({ errorMessage: "Error creating updated deck" }, { status: 400 })

    const newCards = cards.map(card => {
        return {
            term: card.term,
            definition: card.definition,
            deck_id: newDeck.id,
        }
    })

    await prisma.card.createMany({
        data: newCards,
    })


    // const updatedDeck = await prisma.deck.update({
    //     where: { id },
    //     data: { title, description },   
    // })

    // if (!updatedDeck) return NextResponse.json({ errorMessage: 'Error updating deck' }, { status: 404 });

    // const findCard = async(c: CardType) => {
    //     try {
    //         return await prisma.card.findFirst({
    //             where: { id: c.id, deck_id: id }
    //         })
    //     } catch (error) {
    //         console.log(error, 'Error finding card');
    //     }
    // }

    // const updateOneCard = async(c: CardType) => {
    //     try {
    //         return await prisma.card.updateMany({
    //             where: { id: c.id, deck_id: id },
    //             data: {
    //                 term: c.term,
    //                 definition: c.definition
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error, 'Error updating card');
    //     }
    // }

    // const createOneCard = async (c: CardType) => {
    //     try {
    //         return await prisma.card.create({
    //             data: {
    //                 term: c.term,
    //                 definition: c.definition,
    //                 deck_id: id,
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error, "Error creating card");
    //     }
        
    // }

    // const updatedCards = cards.map(async(c) => {
    //         const cardExists = await findCard(c);
    //         if(!cardExists) {
    //             return await createOneCard(c)
    //         } else {
    //             return await updateOneCard(c)
    //         }
    // })

    // if (!updatedCards) return NextResponse.json({ errorMessage: 'Error updating cards' }, { status: 404 });

    const updatedDeckWithCards = await prisma.deck.findUnique({
        where: { id: newDeck.id },
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

    if (!updatedDeckWithCards) return NextResponse.json({errorMessage: 'Cannot find updated deck'}, {status: 404});

    return NextResponse.json(updatedDeckWithCards);

    
}