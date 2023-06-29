import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    const d = await req.json();

    const { id } = d;

    const deletedFolder = await prisma.folder.delete({
        where: { id }
    })

    if (!deletedFolder) return NextResponse.json({ errorMessage: 'Error deleting folder' }, { status: 400 })

    const updatedDecks = await prisma.deck.updateMany({
        where: { folder_id: id },
        data: { folder_id: null }
    })

    if (!updatedDecks) return NextResponse.json({ errorMessage: 'Error updating decks' }, { status: 400 })

    return NextResponse.json(updatedDecks);
}