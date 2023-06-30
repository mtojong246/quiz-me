import axios from "axios";

const useDelete = () => {

    const deleteFolder = async ({ id }: { id: number }) => {
        try {
            const response = await axios.put('http://localhost:3000/api/delete/folder', { id })
            return response.data;
        } catch (error) {
            console.log('error', error)
        }
    }

    const deleteDeck = async ({ id }: { id: number }) => {
        try {
            const response = await axios.put('http://localhost:3000/api/delete/deck', { id })
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