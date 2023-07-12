'use client';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import FaceIcon from '@mui/icons-material/Face';
import CloseIcon from '@mui/icons-material/Close';
import { useSession } from 'next-auth/react';

import ChangeUsername from './components/ChangeUsername';
import ChangePassword from './components/ChangePassword';
import ChangeEmail from './components/ChangeEmail';
import DeleteAccount from './components/DeleteAccount';

export default function Settings() {
    const { data: session } = useSession();

    

    return (
        <div className='w-full bg-slate-50 p-6 md:p-8'>
            <div className='max-w-[1200px] mx-auto'>
                <div className='w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-6 mb-10'>
                    <div className='w-full md:w-[250px] text-center flex flex-row justify-center items-center gap-4 md:flex-col md:gap-0'>
                        <div className='text-[32px] md:text-[50px] text-slate-700'><FaceIcon fontSize='inherit' color='inherit' /></div>
                        <p className='text-lg font-bold text-slate-700'>Change your Username</p>
                    </div>
                    <ChangeUsername />
                </div>
                {session && !session.user?.provider ? (
                <>
                    <div className='w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-6 mb-10'>
                        <div className='w-full md:w-[250px] text-center flex flex-row justify-center items-center gap-4 md:flex-col md:gap-0'>
                            <div className='text-[32px] md:text-[50px] text-slate-700'><MailOutlineIcon fontSize='inherit' color='inherit'/></div>
                            <p className='text-lg font-bold text-slate-700'>Change your Email</p>
                        </div>
                        <ChangeEmail />
                    </div>
                    <div className='w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-6 mb-10'>
                        <div className='w-full md:w-[250px] text-center flex flex-row justify-center items-center gap-4 md:flex-col md:gap-0'>
                            <div className='text-[32px] md:text-[50px] text-slate-700'><SettingsIcon fontSize='inherit' color='inherit' /></div>
                            <p className='text-lg font-bold text-slate-700'>Change your Password</p>
                        </div>
                        <ChangePassword />
                    </div>
                </>
                ) : (
                    <></>
                )}
                {/* <div className='w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-6'>
                    <div className='w-full md:w-[250px] text-center flex flex-row justify-center items-center gap-4 md:flex-col md:gap-0'>
                        <div className='text-[32px] md:text-[50px] text-slate-700'><CloseIcon fontSize='inherit' color='inherit' /></div>
                        <p className='text-lg font-bold text-slate-700'>Delete Account</p>
                    </div>
                    <DeleteAccount />
                </div> */}
            </div>
        </div>
    )
}