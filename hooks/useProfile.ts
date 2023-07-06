import axios from "axios";

const useProfile = () => {

    const changeUsername = async ({ username, password, id }: { username: string, password: string, id: number }) => {
        try {
            const response = await axios.put(`${process.env.NEXTAUTH_URL}/api/edit/user/username`, { username, password, id });
            return response.data;
        } catch (error:any) {
            console.log("error", error);
        }
    }

    return {
        changeUsername,
    }
}

export default useProfile;