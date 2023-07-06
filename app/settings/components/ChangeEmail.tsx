'use client';
import { ChangeEvent, useState } from "react";
import { useSession } from "next-auth/react";
import useProfile from "@/hooks/useProfile";
import CircularProgress from '@mui/material/CircularProgress';

const defaultInput = {
    email: '',
    password: '',
}

export default function ChangeEmail() {
    const { changeEmail } = useProfile();
    const { data: session, update } = useSession();
    const [ input, setInput ] = useState(defaultInput);
    const [ isLoading, setIsLoading ] = useState(false);

    const { email, password } = input;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        if (!email || !password) {
            alert('Please input a email and password to continue');
            return;
        }
        const id = session?.user?.id as number;
        setIsLoading(true);
        const response = await changeEmail({ email, password, id });
        if (response && response.error) {
            alert(`${response.error.response ? response.error.response.data.errorMessage : response.error}`);
            setIsLoading(false);
            return;
        } else if (response) {
            const newSession = {
                ...session,
                user: {
                    ...session?.user,
                    email: response.email,
                }
            }
            await update(newSession);
            setIsLoading(false);
            setInput(defaultInput);
            alert('Your email has been successfully updated');
        } else {
            setIsLoading(false);
            alert('Error changing email');
        }
    }

    return (
        <div className='w-full p-4 rounded-lg bg-white p-4 text-left'>
            <p className='font-bold text-slate-700 text-med mb-1'>Update your email</p>
            <input type='text' value={email} name='email' onChange={handleChange} className='border-b-2 border-slate-700 w-full p-2 mb-1'/><label className='text-[10px] text-slate-400 mb-3 block'>NEW EMAIL</label>
            <input type='password' value={password} name='password' onChange={handleChange} className='border-b-2 border-slate-700 w-full p-2 mb-1'/><label className='text-[10px] text-slate-400 block mb-8'>QUIZME PASSWORD</label>
            <button onClick={handleSubmit} className='bg-[#3CCFCF] text-sm text-white font-bold py-2 px-5 rounded'>
            {isLoading ? <CircularProgress color="inherit" /> : 'Submit'}
            </button>
        </div>
    )
}