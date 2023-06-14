'use client'

import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function NavBar() {
    return (
        <div className='bg-white w-full h-[64px] px-4 flex justify-between items-center'>
            <div>
                <p className="text-slate-500 text-xl font-bold md:block hidden">Quiz<span className='text-[#4255FF]'>Me</span></p>
                <p className="text-[#4255FF] text-xl font-bold md:hidden block">Q</p>
            </div>
            <div className='flex justify-center items-center gap-2'>
                <button className="text-slate-500 text-sm"><AddCircleIcon style={{fontSize: '40px'}} className="text-[#4255FF] text-[40px] cursor-pointer"/></button>
                <button className="text-slate-700 text-sm font-bold hover:bg-slate-200 h-10 px-3.5 rounded-lg cursor-pointer">Log in</button>
                <button className="text-slate-700 text-sm font-bold bg-[#FFCD1F] hover:bg-[#FFE380] h-10 px-3.5 rounded-lg cursor-pointer">Sign up</button>
            </div>
        </div>
    )
}