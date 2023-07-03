'use client';
import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

export interface UserType {
    id: number,
    username: string,
    email: string,
}

interface State {
    loading: boolean,
    error: string | null,
    data: UserType | null,
}

interface AuthState extends State {
    setAuthState: Dispatch<SetStateAction<State>>;
    isLoggedIn: boolean,
    isLogin: boolean,
    setIsLogin: Dispatch<SetStateAction<boolean>>;
    isAuthOpen: boolean,
    toggleAuth: () => void,
}

export const AuthenticationContext = createContext<AuthState>({
    loading: false,
    error: null,
    data: null,
    isLoggedIn: false,
    setAuthState: () => {},
    isLogin: false,
    setIsLogin: () => {},
    isAuthOpen: false,
    toggleAuth: () => {},
})

export default function AuthContext({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const [ authState, setAuthState ] = useState<State>({
        loading: false,
        data: null,
        error: null,
    })
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ isAuthOpen, setIsAuthOpen ] = useState(false);
    const [ isLogin, setIsLogin ] = useState(false);
    const toggleAuth = () => setIsAuthOpen(!isAuthOpen);

    useEffect(() => {
        if(session) {
            setIsLoggedIn(true);
            setAuthState({ data: (session as Session).user as UserType, error: null, loading: false });
            return;
        }
        setIsLoggedIn(false);
        setAuthState({ data: null, error: null, loading: false })
        return;
    }, [session]);


    return (
        <AuthenticationContext.Provider value={{...authState, setAuthState, isLoggedIn, isLogin, setIsLogin, isAuthOpen, toggleAuth}}>{children}</AuthenticationContext.Provider>
    )
}