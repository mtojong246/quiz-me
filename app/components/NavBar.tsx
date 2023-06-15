'use client';
import { useState, MouseEvent } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import Authentication from './Authentication';
import Dropdown from './Dropdown';
import Link from 'next/link';
import { SideMenu } from './SideMenu';
import { LibraryMenu } from './LibraryMenu';

export default function NavBar() {
    const [ isAuthOpen, setIsAuthOpen ] = useState(false);
    const [ isLogin, setIsLogin ] = useState(false);
    const [ isMenu, setIsMenu ] = useState(false);
    const [ isLibrary, setIsLibrary ] = useState(false);

    const toggleAuth = () => setIsAuthOpen(!isAuthOpen);
    const toggleSignin = () => setIsLogin(!isLogin);
    const toggleMenu = () => setIsMenu(!isMenu);
    const toggleLibrary = () => setIsLibrary(!isLibrary);

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
            <div className='flex justify-start items-center'>
                <Link href='/latest'><p className="text-slate-500 text-xl font-bold md:block hidden cursor-pointer mr-4">Quiz<span className='text-[#4255FF]'>Me</span></p></Link>
                <MenuIcon style={{fontSize: '32px', color: '#595959'}} className='block md:hidden mr-4' onClick={toggleMenu}/>
                <Link href='/latest'><p className="text-[#4255FF] text-xl font-bold md:hidden block cursor-pointer mr-4">Q</p></Link>
                <button className='text-sm text-slate-500 font-bold cursor-pointer hidden md:block' onClick={toggleLibrary}>
                    <div className='flex justify-center align-center gap-1'>
                        <p>Your library</p>
                        <KeyboardArrowDownIcon style={{fontSize: '20px', color: '#595959'}}/>
                    </div>
                </button>
            </div>
            <div className='flex justify-end items-center gap-2'>
                <Dropdown />
                <button className="text-slate-700 text-sm font-bold hover:bg-slate-200 h-10 px-3.5 rounded-lg cursor-pointer" value='Log in' onClick={handleClick}>Log in</button>
                <button className="text-slate-700 text-sm font-bold bg-[#FFCD1F] hover:bg-[#FFE380] h-10 px-3.5 rounded-lg cursor-pointer" value='Sign up' onClick={handleClick}>Sign up</button>
            </div>
        </div>
        {isAuthOpen && <Authentication toggleAuth={toggleAuth} toggleSignin={toggleSignin} isLogin={isLogin}/>}
        {isMenu && <SideMenu toggleMenu={toggleMenu}/>}
        {isLibrary && <LibraryMenu />}
        </>
    )
}