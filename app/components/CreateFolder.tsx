'use client';
import CloseIcon from '@mui/icons-material/Close';
import { Fade } from '@mui/material';

export const CreateFolder = ({ checked, toggleFolder }: { checked: boolean, toggleFolder: () => void }) => {
    return (
        <Fade in={checked}>
            <div>
                <div className='fixed top-0 bottom-0 right-0 left-0 bg-slate-700 opacity-50 h-screen' onClick={toggleFolder}></div>
                <div className='fixed top-0 bottom-0 right-0 left-0 z-10 bg-white h-screen p-6 sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-85%] sm:h-fit sm:w-[640px] sm:rounded-xl'>
                    <div className='flex justify-between items-center mb-6'>
                        <p className='text-xl text-slate-700 font-bold'>Create a new folder</p>
                        <CloseIcon style={{fontSize: '24px', color: '#595959'}} onClick={toggleFolder} className='cursor-pointer'/>
                    </div>
                    <input type='text' className='w-full bg-slate-100 p-4 text-reg rounded-lg mb-5' placeholder='Enter a title' />
                    <textarea className='h-[60px] p-4 text-reg w-full bg-slate-100 rounded-lg mb-16' placeholder='Enter a description (optional)' />
                    <div className='sm:pt-4 sm:border-t sm:border-slate-200 sm:flex sm:justify-end sm:items-center'>
                        <button className='w-full sm:w-auto text-center text-xsm font-bold p-3 text-white bg-[#4255FF] hover:bg-[#0017E6] disabled:bg-slate-200 rounded-lg cursor-pointer'>Create folder</button>
                    </div>
                </div>
            </div>
        </Fade>
    )
}