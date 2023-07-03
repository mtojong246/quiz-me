import axios from 'axios';
import { useContext } from 'react';
import { AuthenticationContext } from '@/app/context/AuthContext';
import { signOut } from 'next-auth/react';

const useAuth = () => {
    const { setAuthState } = useContext(AuthenticationContext);

    const signup = async ({ username, email, password }: { username: string; email: string; password: string; }) => {
        setAuthState({ data: null, error: null, loading: true });

        try {
            const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/auth/signup`, {
                username, 
                email,
                password,
            })

            setAuthState({ data: response.data, error: null, loading: false });
        } catch(err: any) {
            setAuthState({ data: null, error: err.response.data.errorMessage, loading: false })
        }
    }

    const signout = async () => {
        await signOut({
            callbackUrl: `${process.env.NEXTAUTH_URL}`
        });
        setAuthState({ data: null, error: null, loading: false });
    }

    return { signup, signout }
}

export default useAuth;
