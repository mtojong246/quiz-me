import axios from "axios";
import { UserType } from "@/app/context/AuthContext";
import { DeckType } from "@/app/create-set/page";


const useSave = () => {

    const createDeck = async ({ deck, id }: { deck: DeckType, id: number }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/save/deck', { deck, id });
            return response.data;
        } catch (error) {
            console.log('error', error);
        }
    }

    return {
        createDeck,
    }
}

export default useSave;