import axios from "axios";
import { DeckBasic } from "@/app/context/DeckContext";


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

    return {
        createDeck,
        editDeck,
    }
}

export default useSave;