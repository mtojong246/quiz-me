import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { id }: { id: number } = await req.json();

    const folderData = await prisma.folder.findMany({
        where: { user_id: id },
        select: {
            id: true,
            title: true,
            description: true,
            decks: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    cards: true,
                    folder_id: true,
                }
            },
            user_id: true,
            created_at: true,
            updated_at: true,
        }
    })

    if (!folderData) return NextResponse.json({ errorMessage: "Unable to retrieve folders" }, { status: 404 });

    return NextResponse.json(folderData);
}