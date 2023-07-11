import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/jwt";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    const accessToken = req.headers.get('Authorization');

    if (!accessToken || !verifyJwt(accessToken)) return NextResponse.json({ errorMessage: "Unauthorized request" }, { status: 401 });

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