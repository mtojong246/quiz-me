'use client';
import { ChangeEvent, useState } from "react";
import { useSession } from "next-auth/react";
import useProfile from "@/hooks/useProfile";
import CircularProgress from '@mui/material/CircularProgress';

const defaultInput = {
    username: '',
    password: '',
}

export default function ChangeUsername() {
    const { changeUsername } = useProfile();
    const { data: session, update } = useSession();
    const [ input, setInput ] = useState(defaultInput);
    const [ isLoading, setIsLoading ] = useState(false);

    const { username, password } = input; 

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        const id = session?.user?.id as number;
        if (!username || !password) {
            setIsLoading(false);
            alert('Please input a username and password to continue');
            return;
        }
        const response = await changeUsername({ username, password, id });
        if (response) {
            const newSession = {
                ...session,
                user: {
                    ...session?.user,
                    username: response.username,
                }
            }
            await update(newSession);
            setIsLoading(false);
            setInput(defaultInput);
            alert('Your username has been successfully updated');
        } else {
            setIsLoading(false);
            setInput(defaultInput);
            alert('Error changing username');
        }
    }



    return (
        <div className='w-full p-4 rounded-lg bg-white p-4 text-left'>
            <p className='font-bold text-slate-700 text-med mb-1'>Update your username</p>
            <input type='text' value={username} name='username' onChange={handleChange} className='border-b-2 border-slate-700 w-full p-2  mb-1'/><label className='text-[10px] text-slate-400 block mb-3'>NEW USERNAME</label>
            <input type='password' value={password} name='password' onChange={handleChange} className='border-b-2 border-slate-700 w-full p-2 mb-1'/><label className='text-[10px] text-slate-400 block mb-8'>QUIZME PASSWORD</label>
            <button onClick={handleSubmit} className='bg-[#3CCFCF] text-sm text-white font-bold py-2 px-5 rounded'>
            {isLoading ? <CircularProgress color="inherit" /> : 'Submit'}
            </button>
        </div>
    )
}