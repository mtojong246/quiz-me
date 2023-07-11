import axios from "axios";
import { useSession } from "next-auth/react";


const useData = () => {
    const { data: session } = useSession();

    const config = {
        headers: { Authorization: session?.user?.accessToken }
    }

    const fetchUserDecks = async (id: number) => {
        try {
            const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/data/deck`, { id }, config);
            return response.data;
        } catch (error) {
            console.log('error', error);
        }
    }

    const fetchUserFolders = async (id: number) => {
        try {
            const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/data/folder`, { id }, config);
            return response.data;
        } catch (error) {
            console.log('error', error);
        }
    }

    return {
        fetchUserDecks,
        fetchUserFolders,
    }

}

export default useData;
