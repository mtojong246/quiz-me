import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    const d = await req.json();

    const { id } = d;

    const deletedDeck = await prisma.deck.delete({
        where: { id }
    })

    if (!deletedDeck) return NextResponse.json({ errorMessage: 'Error deleting deck' }, { status: 400 });

    return NextResponse.json(deletedDeck);

}