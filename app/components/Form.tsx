'use client';

import CloseIcon from '@mui/icons-material/Close';

export const Form = ({ toggleAuth }: { toggleAuth: () => void }) => {
    return (
        <div className='p-4 bg-white'>
                <div className='w-full flex justify-between items-start'>
                    <div className='flex justify-center items-start gap-6'>
                        <button className='text-xl text-slate-700 font-bold cursor-pointer'>Sign up</button>
                        <button className='text-xl text-slate-700 font-bold text-center cursor-pointer'>Log in<img src={'https://freepngimg.com/save/99754-art-black-brush-free-transparent-image-hd/920x438'} alt='underline' className='w-24' style={{filter: 'invert(82%) sepia(96%) saturate(1785%) hue-rotate(332deg) brightness(98%) contrast(103%)'}}/></button>
                    </div>
                    <div>
                        <button onClick={toggleAuth}><CloseIcon style={{fontSize: '30px'}} className='text-slate-700'/></button>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center my-8 gap-4'>
                    <button className='w-full rounded-lg border border-slate-150 px-6 py-3 text-reg text-slate-500 font-bold cursor-pointer'>Continue With Google</button>
                    <button className='w-full rounded-lg border border-slate-150 px-6 py-3 text-reg text-slate-500 font-bold cursor-pointer'>Continue With Facebook</button>
                </div>
                <div className='flex justify-evenly items-center'>
                    <hr className='w-2/5 pr-2'/>
                    <span className='text-xsm text-slate-500 font-bold'>OR EMAIL</span>
                    <hr className='w-2/5 pl-2'/>
                </div>
                <div className='mt-7 mb-8'>
                    <div className='mb-4'>
                        <p className='text-xsm text-slate-500 font-bold mb-2'>USERNAME</p>
                        <input type='text' name='username' placeholder='user123' className='text-reg text-slate-700 p-3 w-full border-2 border-black rounded'/>
                    </div>
                    <div className='mb-4'>
                        <p className='text-xsm text-slate-500 font-bold mb-2'>EMAIL</p>
                        <input type='text' name='email' placeholder='user@quizme.com' className='text-reg text-slate-700 p-3 w-full border-2 border-black rounded'/>
                    </div>
                    <div className='mb-4'>
                        <p className='text-xsm text-slate-500 font-bold mb-2'>PASSWORD</p>
                        <input type='password' name='password' placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;' className='text-reg text-slate-700 p-3 w-full border-2 border-black rounded'/>
                    </div>
                    <p className='mb-4 mt-8 text-xsm text-slate-500 text-center'>By tapping Log in, you accept QuizMe's Terms of Service and Privacy Policy</p>
                    <button className='bg-[#3CCFCF] text-[18px] font-bold text-white text-center rounded w-full p-6 mb-4'>Log in</button>
                    <div className='bg-white text-sm font-bold text-slate-500 text-center border-2 border-slate-150 rounded w-full p-2'>New to QuizMe?<button className='ml-1 text-[#3CCFCF] cursor-pointer'>Create an Account</button></div>
                </div>
            </div>
    )
}