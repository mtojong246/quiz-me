'use client';
import { useState, MouseEvent } from 'react';
import Authentication from './Authentication';
import Dropdown from './Dropdown';

export default function NavBar() {
    const [ isAuthOpen, setIsAuthOpen ] = useState(false);
    const [ isLogin, setIsLogin ] = useState(false);

    const toggleAuth = () => setIsAuthOpen(!isAuthOpen);
    const toggleSignin = () => setIsLogin(!isLogin);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        toggleAuth();
        if ((e.target as HTMLButtonElement).value === 'Log in') {
            return setIsLogin(true);
        }
        return setIsLogin(false);
    }  

    return (
        <>
        <div className='bg-white w-full h-[64px] px-4 flex justify-between items-center'>
            <div>
                <p className="text-slate-500 text-xl font-bold md:block hidden">Quiz<span className='text-[#4255FF]'>Me</span></p>
                <p className="text-[#4255FF] text-xl font-bold md:hidden block">Q</p>
            </div>
            <div className='flex justify-center items-center gap-2'>
                <Dropdown />
                <button className="text-slate-700 text-sm font-bold hover:bg-slate-200 h-10 px-3.5 rounded-lg cursor-pointer" value='Log in' onClick={handleClick}>Log in</button>
                <button className="text-slate-700 text-sm font-bold bg-[#FFCD1F] hover:bg-[#FFE380] h-10 px-3.5 rounded-lg cursor-pointer" value='Sign up' onClick={handleClick}>Sign up</button>
            </div>
        </div>
        {isAuthOpen && <Authentication toggleAuth={toggleAuth} toggleSignin={toggleSignin} isLogin={isLogin}/>}
        </>
    )
}