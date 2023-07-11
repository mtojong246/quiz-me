import axios from "axios";
import { useSession } from "next-auth/react";

const useDelete = () => {
    const { data: session } = useSession();

    const config = {
        headers: { Authorization: session?.user?.accessToken }
    }

    const deleteFolder = async ({ id }: { id: number }) => {
        try {
            const response = await axios.put(`${process.env.NEXTAUTH_URL}/api/delete/folder`, { id }, config)
            return response.data;
        } catch (error) {
            console.log('error', error)
        }
    }

    const deleteDeck = async ({ id }: { id: number }) => {
        try {
            const response = await axios.put(`${process.env.NEXTAUTH_URL}/api/delete/deck`, { id }, config)
            return response.data;
        } catch (error) {
            console.log('error', error)
        }
    }

    return {
        deleteFolder,
        deleteDeck
    }

}

export default useDelete;