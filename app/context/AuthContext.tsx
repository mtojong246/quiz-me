'use client';
import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface User {
    username: string,
    email: string,
}

interface State {
    loading: boolean,
    error: string | null,
    data: User | null,
}

interface AuthState extends State {
    setAuthState: Dispatch<SetStateAction<State>>;
    isLoggedIn: boolean,
}

export const AuthenticationContext = createContext<AuthState>({
    loading: false,
    error: null,
    data: null,
    isLoggedIn: false,
    setAuthState: () => {},
})

export default function AuthContext({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const [ authState, setAuthState ] = useState<State>({
        loading: false,
        data: null,
        error: null,
    })
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        if(session) {
            setIsLoggedIn(true);
            setAuthState({ data: (session as Session).user as User, error: null, loading: false });
            return;
        }
        setIsLoggedIn(false);
        setAuthState({ data: null, error: null, loading: false })
        return;
    }, [session])

    return (
        <AuthenticationContext.Provider value={{...authState, setAuthState, isLoggedIn}}>{children}</AuthenticationContext.Provider>
    )
}