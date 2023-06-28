import axios from "axios";

const useData = () => {

    const fetchUserData = async ({ email }: { email: string }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/data/user', { email });
            return response.data;
        } catch (error) {
            console.log('error', error)
        }
    } 

    const fetchUserDecks = async (id: number) => {
        try {
            const response = await axios.post('http://localhost:3000/api/data/deck', { id });
            return response.data;
        } catch (error) {
            console.log('error', error);
        }
    }

    const fetchUserFolders = async (id: number) => {
        try {
            const response = await axios.post('http://localhost:3000/api/data/folder', { id });
            return response.data;
        } catch (error) {
            console.log('error', error);
        }
    }

    return {
        fetchUserData,
        fetchUserDecks,
        fetchUserFolders,
    }

}

export default useData;
