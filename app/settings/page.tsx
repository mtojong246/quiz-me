'use client';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import FaceIcon from '@mui/icons-material/Face';
import CloseIcon from '@mui/icons-material/Close';

export default function Settings() {
    return (
        <div className='w-full bg-slate-50 p-6 md:p-8'>
            <div className='max-w-[1200px] mx-auto'>
                <div className='w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-6 mb-10'>
                    <div className='w-full md:w-[250px] text-center'>
                        <p className='text-lg font-bold text-slate-700'>Change your Username</p>
                    </div>
                    <div className='w-full p-4 rounded-lg bg-white h-[500px]'></div>
                </div>
                <div className='w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-6 mb-10'>
                    <div className='w-full md:w-[250px] text-center flex flex-row justify-center items-center gap-4 md:flex-col md:gap-0'>
                        <div className='text-[32px] md:text-[50px] text-slate-700'><MailOutlineIcon fontSize='inherit' color='inherit'/></div>
                        <p className='text-lg font-bold text-slate-700'>Change your Email</p>
                    </div>
                    <div className='w-full p-4 rounded-lg bg-white h-[500px]'></div>
                </div>
                <div className='w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-6 mb-10'>
                    <div className='w-full md:w-[250px] text-center'>
                        <p className='text-lg font-bold text-slate-700'>Change your Password</p>
                    </div>
                    <div className='w-full p-4 rounded-lg bg-white h-[500px]'></div>
                </div>
                <div className='w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-6'>
                    <div className='w-full md:w-[250px] text-center'>
                        <p className='text-lg font-bold text-slate-700'>Delete Account</p>
                    </div>
                    <div className='w-full p-4 rounded-lg bg-white h-[500px]'></div>
                </div>
            </div>
        </div>
    )
}