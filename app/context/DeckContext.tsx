'use client';
import { createContext, ReactNode, useState, useEffect, useContext, SetStateAction, Dispatch } from "react";
import { AuthenticationContext } from "./AuthContext";
import { Deck } from "@prisma/client";
import useData from "@/hooks/useData";
import { DeckType } from "../create-set/page";

export interface CardType {
    id: number;
    term: string;
    definition: string;
}

interface DeckState {
    decks: DeckType[],
    isDeckLoading: boolean,
    setDecks: Dispatch<SetStateAction<DeckType[]>>,
}

export const DeckContext = createContext<DeckState>({
    decks: [],
    setDecks: () => {},
    isDeckLoading: false,
})

export default function DeckProvider({ children }: { children: ReactNode }) {
    const { fetchUserDecks } = useData();
    const { data } = useContext(AuthenticationContext);
    const [ decks, setDecks ] = useState<DeckType[]>([]);
    const [ isDeckLoading, setIsDeckLoading ] = useState(false);

    useEffect(() => {
        const fetchDecks = async () => {
            setIsDeckLoading(true);
            if (data) {
                const id = data.id;
                const userDecks = await fetchUserDecks(id)
                setDecks(userDecks);
                setIsDeckLoading(false);
            }
        }
        fetchDecks();
    }, [data])

    return (
        <DeckContext.Provider value={{decks, isDeckLoading, setDecks}}>{children}</DeckContext.Provider>
    )
}