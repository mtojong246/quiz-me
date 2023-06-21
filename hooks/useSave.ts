import { DeckType } from "@/app/create-set/components/Card";
import axios from "axios";
import { UserType } from "@/app/context/AuthContext";


const useSave = () => {

    const createDeck = async ({ deck, data }: { deck: DeckType, data: UserType }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/save/deck', { deck, data });
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