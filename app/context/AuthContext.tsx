'use client';
import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import axios from "axios";

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
    setAuthState: Dispatch<SetStateAction<State>>
}

export const AuthenticationContext = createContext<AuthState>({
    loading: false,
    error: null,
    data: null,
    setAuthState: () => {},
})

export default function AuthContext({ children }: { children: ReactNode }) {
    const [ authState, setAuthState ] = useState<State>({
        loading: false,
        data: null,
        error: null,
    })

    return (
        <AuthenticationContext.Provider value={{...authState, setAuthState}}>{children}</AuthenticationContext.Provider>
    )
}