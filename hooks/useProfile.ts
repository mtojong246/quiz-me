import axios from "axios";
import validator from "validator";

const useProfile = () => {

    const changeUsername = async ({ username, password, id }: { username: string, password: string, id: number }) => {
        try {
            const response = await axios.put(`${process.env.NEXTAUTH_URL}/api/edit/user/username`, { username, password, id });
            return response.data;
        } catch (error:any) {
            console.log("error", error);
        }
    }

    const changeEmail = async ({ email, password, id }: { email: string, password: string, id: number }) => {
        const isValid = validator.isEmail(email);
        if (!isValid) return { error: 'Email is not valid' }
        try {
            const response = await axios.put(`${process.env.NEXTAUTH_URL}/api/edit/user/email`, { email, password, id });
            return response.data;
        } catch (error:any) {
            return { error: error }
        }
    }

    return {
        changeUsername,
        changeEmail,
    }
}

export default useProfile;