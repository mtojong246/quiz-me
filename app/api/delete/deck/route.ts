import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/jwt";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    const accessToken = req.headers.get('Authorization');

    if (!accessToken || !verifyJwt(accessToken)) return NextResponse.json({ errorMessage: "Unauthorized request" }, { status: 401 });

    const d = await req.json();

    const { id } = d;

    const deletedDeck = await prisma.deck.delete({
        where: { id }
    })

    if (!deletedDeck) return NextResponse.json({ errorMessage: 'Error deleting deck' }, { status: 400 });

    return NextResponse.json(deletedDeck);

}