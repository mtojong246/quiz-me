import axios from 'axios';
import { useContext } from 'react';
import { AuthenticationContext } from '@/app/context/AuthContext';

const useAuth = () => {
    const { setAuthState } = useContext(AuthenticationContext);

    const signup = async ({ username, email, password }: { username: string; email: string; password: string; }) => {
        setAuthState({ data: null, error: null, loading: true });

        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', {
                username, 
                email,
                password,
            })

            setAuthState({ data: response.data, error: null, loading: false });
        } catch(err: any) {
            setAuthState({ data: null, error: err.response.data.errorMessage, loading: false })
        }
    }

    const signout = () => {
        setAuthState({ data: null, error: null, loading: false });
    }

    return { signup, signout }
}

export default useAuth;
