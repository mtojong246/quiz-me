import { PrismaClient } from "@prisma/client";
import { FolderBasic } from "@/app/context/FolderContext";
import { NextResponse } from "next/server";
import { FolderWithId } from "@/app/folders/[slug]/page";
import { verifyJwt } from "@/jwt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const accessToken = req.headers.get('Authorization');

    if (!accessToken || !verifyJwt(accessToken)) return NextResponse.json({ errorMessage: "Unauthorized request" }, { status: 401 });

    const d = await req.json();

    const { folder, id }: { folder: FolderBasic, id: number } = d;

    const newFolder = await prisma.folder.create({
        data: {
            title: folder.title,
            description: folder.description,
            user_id: id,
        }
    })

    if (!newFolder) return NextResponse.json({errorMessage: 'Error creating new folder'}, {status: 400});

    const updatedFolder = await prisma.folder.findUnique({
        where: { id: newFolder.id },
        select: {
            id: true,
            title: true,
            description: true,
            user_id: true,
            decks: true,
            created_at: true,
            updated_at: true,
        }
    })
    
    if (!updatedFolder) return NextResponse.json({errorMessage: 'Cannot retrieve newly created folder'}, {status: 404});

    return NextResponse.json(updatedFolder);

}

export async function PUT(req: Request) {
    const accessToken = req.headers.get('Authorization');

    if (!accessToken || !verifyJwt(accessToken)) return NextResponse.json({ errorMessage: "Unauthorized request" }, { status: 401 });

    const d = await req.json();

    const { id, folder }: { id: number, folder: FolderWithId } = d;

    const updatedFolder = await prisma.folder.update({
        where: { id },
        data: {
            title: folder.title,
            description: folder.description,
        }
    })

    if (!updatedFolder) return NextResponse.json({errorMessage: 'Error updating folder'}, {status: 400});

    return NextResponse.json(updatedFolder);


}