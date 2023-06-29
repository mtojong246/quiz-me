import axios from "axios";
import { DeckBasic } from "@/app/context/DeckContext";
import { FolderBasic } from "@/app/context/FolderContext";


const useSave = () => {

    const createDeck = async ({ deck, id }: { deck: DeckBasic, id: number }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/save/deck', { deck, id });
            return response.data;
        } catch (error) {
            console.log('error', error);
        }
    }

    const editDeck = async ({ deck }: { deck: DeckBasic }) => {
        try {
            const response = await axios.put('http://localhost:3000/api/edit/deck', { deck });
            return response.data;
        } catch (error) {
            console.log('error', error);
        }
    }

    const createFolder = async ({ folder, id }: { folder: FolderBasic, id: number}) => {
        try {
            const response = await axios.post('http://localhost:3000/api/save/folder', { folder, id });
            return response.data;
        } catch (error) {
            console.log('error', error)
        }
    }

    const addDeckToFolder = async ({ id, deck_id }: { id: number, deck_id: number }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/edit/folder', { id, deck_id });
            return response.data;
        } catch (error) {
            console.log('error', error)
        }
    }

    const removeDeckFromFolder = async ({ deck_id }: { deck_id: number }) => {
        try {
            const response = await axios.put('http://localhost:3000/api/edit/folder', { deck_id });
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
        removeDeckFromFolder
    }
}

export default useSave;