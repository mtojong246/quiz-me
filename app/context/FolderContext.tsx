'use client';
import { createContext, ReactNode, useState, useEffect, useContext, SetStateAction, Dispatch } from "react";
import { Folder } from "@prisma/client";
import { DeckBasic } from "./DeckContext";
import useData from "@/hooks/useData";
import { AuthenticationContext } from "./AuthContext";

export interface DeckWithId extends DeckBasic {
    id: number;
    folder_id: number;
}

export interface FolderBasic {
    title: string;
    description?: string;
}

export interface FolderWithDecks extends FolderBasic {
    decks: DeckWithId[];
}

export interface FolderType extends Folder {
    decks: DeckWithId[];
}

interface FolderState {
    folders: FolderType[];
    setFolders: Dispatch<SetStateAction<FolderType[]>>;
}

export const FolderContext = createContext<FolderState>({
    folders: [],
    setFolders: () => {},
})

export default function FolderProvider({ children }: { children: ReactNode }) {
    const { fetchUserFolders } = useData();
    const { data } = useContext(AuthenticationContext);
    const [ folders, setFolders ] = useState<FolderType[]>([]);

    useEffect(() => {
        const fetchFolders = async () => {
            if (data) {
                const id = data.id;
                const userFolders: FolderType[] = await fetchUserFolders(id)
                setFolders(userFolders);
            }
        }
        fetchFolders();
    }, [data])

    return (
        <FolderContext.Provider value={{folders, setFolders}}>{children}</FolderContext.Provider>
    )
}