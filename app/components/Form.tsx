'use client';
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent, useState, useEffect, useContext } from 'react';
import useAuth from '@/hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { UserType } from '../context/AuthContext';

export const Form = ({ toggleAuth, toggleSignin, isLogin }: { toggleAuth: () => void, toggleSignin: () => void, isLogin: boolean }) => {
    const router = useRouter();
    const { loading, error, setAuthState } = useContext(AuthenticationContext);
    const { signup } = useAuth()
    const [ inputs, setInputs ] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [ disabled, setDisabled ] = useState(true);
    const [ popup, setPopup ] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        if(isLogin) {
            if(inputs.email && inputs.password ) {
                return setDisabled(false);
            }
        } else {
            if(inputs.username && inputs.email && inputs.password) {
                return setDisabled(false);
            }
        }

        return setDisabled(true);
    }, [inputs])

    const handleClick = async () => {
        if(isLogin) {
            setAuthState({ data: null, error: null, loading: true })
            const response = await signIn('credentials', {
                email: inputs.email,
                password: inputs.password,
                redirect: false,
            });

            if(response && !response.error) {
                const session = await getSession();
                if (!session) {
                    console.log('no session found');
                    return;
                }
                setAuthState({ data: session.user as UserType, error: null, loading: false });
            } else if (response && response.error) {
                setAuthState({ data: null, error: response.error, loading: false });
                setPopup(true);
            }

            setInputs({
                username: '',
                email: '',
                password: '',
            })

        } else {
            await signup(inputs);
            setPopup(true);
            setInputs({
                username: '',
                email: '',
                password: '',
            })
        }
    }

    const handleGoogleSignin = async () => {
        await signIn('google');
    }
    
    return (
        <div className='p-4 bg-white'>
                {!error && popup ? <Alert severity='success' onClose={() => {setPopup(false)}} style={{marginBottom: '16px'}}>You've successfully created an account!</Alert> : null}
                {error && popup ? <Alert severity='error' onClose={() => {setPopup(false)}} style={{marginBottom: '16px'}}>{error}</Alert> : null}
                <div className='w-full flex justify-between items-start'>
                    <div className='flex justify-center items-start gap-6'>
                        <button disabled={!isLogin} onClick={toggleSignin} className={`text-xl ${isLogin ? 'text-slate-400' : 'text-slate-700'} font-bold text-center cursor-pointer`}>Sign up<img src={'https://freepngimg.com/save/99754-art-black-brush-free-transparent-image-hd/920x438'} alt='underline' className={`w-24 ${isLogin ? 'hidden' : 'block'}`} style={{filter: 'invert(82%) sepia(96%) saturate(1785%) hue-rotate(332deg) brightness(98%) contrast(103%)'}}/></button>
                        <button disabled={isLogin} onClick={toggleSignin} className={`text-xl ${isLogin ? 'text-slate-700' : 'text-slate-400'} font-bold text-center cursor-pointer`}>Log in<img src={'https://freepngimg.com/save/99754-art-black-brush-free-transparent-image-hd/920x438'} alt='underline' className={`w-24 ${isLogin ? 'block' : 'hidden'}`} style={{filter: 'invert(82%) sepia(96%) saturate(1785%) hue-rotate(332deg) brightness(98%) contrast(103%)'}}/></button>
                    </div>
                    <div>
                        <button onClick={toggleAuth}><CloseIcon style={{fontSize: '30px'}} className='text-slate-700'/></button>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center my-8 gap-4'>
                    <button onClick={handleGoogleSignin} className='w-full rounded-lg border border-slate-150 px-6 py-3 text-reg text-slate-500 font-bold cursor-pointer'>
                        <div className='flex justify-center items-center'>
                            <img src='/google-icon.svg' alt='google' className='h-4 w-4 mr-2.5'/>
                            <p>Continue With Google</p>
                        </div>
                    </button>
                    <button className='w-full rounded-lg border border-slate-150 px-6 py-3 text-reg text-slate-500 font-bold cursor-pointer'>
                        <div className='flex justify-center items-center'>
                            <img src='/facebook-icon.svg' alt='facebook' className='h-6 w-6 mr-2' />
                            <p>Continue With Facebook</p>
                        </div>
                    </button>
                </div>
                <div className='flex justify-evenly items-center'>
                    <hr className='w-2/5 pr-2'/>
                    <span className='text-xsm text-slate-500 font-bold'>OR EMAIL</span>
                    <hr className='w-2/5 pl-2'/>
                </div>
                <div className='mt-7 mb-8'>
                    {isLogin ? null : (<div className='mb-4'>
                        <p className='text-xsm text-slate-500 font-bold mb-2'>USERNAME</p>
                        <input type='text' name='username' value={inputs.username} onChange={handleChange} placeholder='user123' className='text-reg text-slate-700 p-3 w-full border-2 border-black rounded'/>
                    </div>)}
                    <div className='mb-4'>
                        <p className='text-xsm text-slate-500 font-bold mb-2'>EMAIL</p>
                        <input type='text' name='email' value={inputs.email} onChange={handleChange} placeholder='user@quizme.com' className='text-reg text-slate-700 p-3 w-full border-2 border-black rounded'/>
                    </div>
                    <div className='mb-4'>
                        <p className='text-xsm text-slate-500 font-bold mb-2'>PASSWORD</p>
                        <input type='password' name='password' value={inputs.password} onChange={handleChange} placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;' className='text-reg text-slate-700 p-3 w-full border-2 border-black rounded'/>
                    </div>
                    <p className='mb-4 mt-8 text-xsm text-slate-500 text-center'>By tapping {isLogin ? 'Log in' : 'Sign up'}, you accept QuizMe's Terms of Service and Privacy Policy</p>
                    <button disabled={disabled} onClick={handleClick} className='bg-[#3CCFCF] disabled:bg-[#A3A3A3] hover:bg-[#29a3a3] text-[18px] font-bold text-white text-center rounded w-full p-6 mb-4 cursor-pointer'>
                        {loading ? <CircularProgress /> : (
                            <p>{`${isLogin ? 'Log in' : 'Sign up'}`}</p>
                        )}
                    </button>
                    <div className='bg-white text-sm font-bold text-slate-500 text-center border-2 border-slate-150 rounded w-full p-2'>{isLogin ? 'New to QuizMe?' : 'Already have an account?'}<button className='ml-1 text-[#3CCFCF] hover:text-[#29a3a3] cursor-pointer' onClick={toggleSignin}>{isLogin ? 'Create an account' : 'Log in'}</button></div>
                </div>
            </div>
    )
}