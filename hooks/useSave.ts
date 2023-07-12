import axios from "axios";
import { DeckBasic } from "@/app/context/DeckContext";
import { FolderBasic } from "@/app/context/FolderContext";
import { FolderWithId } from "@/app/folders/[slug]/page";
import { useSession } from "next-auth/react";


const useSave = () => {
    const { data: session } = useSession();

    const config = {
        headers: { Authorization: session?.user?.accessToken }
    }

    const createDeck = async ({ deck, id }: { deck: DeckBasic, id: number }) => {
        try {
            const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/save/deck`, { deck, id }, config);
            return response.data;
        } catch (error) {
            console.log('error', error);
        }
    }

    const editDeck = async ({ deck, user_id }: { deck: DeckBasic, user_id: number }) => {
        try {
            const response = await axios.put(`${process.env.NEXTAUTH_URL}/api/edit/deck`, { deck, user_id }, config);
            return response.data;
        } catch (error) {
            console.log('error', error);
        }
    }

    const createFolder = async ({ folder, id }: { folder: FolderBasic, id: number}) => {
        try {
            const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/save/folder`, { folder, id }, config);
            return response.data;
        } catch (error) {
            console.log('error', error)
        }
    }

    const addDeckToFolder = async ({ id, deck_id }: { id: number, deck_id: number }) => {
        try {
            const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/edit/folder`, { id, deck_id }, config);
            return response.data;
        } catch (error) {
            console.log('error', error)
        }
    }

    const removeDeckFromFolder = async ({ deck_id }: { deck_id: number }) => {
        try {
            const response = await axios.put(`${process.env.NEXTAUTH_URL}/api/edit/folder`, { deck_id }, config);
            return response.data;
        } catch (error) {
            console.log('error', error)
        }
    }

    const editFolder = async ({ id, folder }: { id: number, folder: FolderWithId }) => {
        try {
            const response = await axios.put(`${process.env.NEXTAUTH_URL}/api/save/folder`, { id, folder }, config);
            return response.data;
        } catch (error) {
            console.log('error', error)
        }
    }

    return {
        createDeck,
        editDeck,
        createFolder,
        addDeckToFolder,
        removeDeckFromFolder,
        editFolder
    }
}

export default useSave;