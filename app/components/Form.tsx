'use client';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

export const Form = ({ toggleAuth, toggleSignin, isLogin }: { toggleAuth: () => void, toggleSignin: () => void, isLogin: boolean }) => {
    return (
        <div className='p-4 bg-white'>
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
                    <button className='w-full rounded-lg border border-slate-150 px-6 py-3 text-reg text-slate-500 font-bold cursor-pointer'>
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
                        <input type='text' name='username' placeholder='user123' className='text-reg text-slate-700 p-3 w-full border-2 border-black rounded'/>
                    </div>)}
                    <div className='mb-4'>
                        <p className='text-xsm text-slate-500 font-bold mb-2'>EMAIL</p>
                        <input type='text' name='email' placeholder='user@quizme.com' className='text-reg text-slate-700 p-3 w-full border-2 border-black rounded'/>
                    </div>
                    <div className='mb-4'>
                        <p className='text-xsm text-slate-500 font-bold mb-2'>PASSWORD</p>
                        <input type='password' name='password' placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;' className='text-reg text-slate-700 p-3 w-full border-2 border-black rounded'/>
                    </div>
                    <p className='mb-4 mt-8 text-xsm text-slate-500 text-center'>By tapping {isLogin ? 'Log in' : 'Sign up'}, you accept QuizMe's Terms of Service and Privacy Policy</p>
                    <Link href='/latest'><button onClick={toggleAuth} className='bg-[#3CCFCF] hover:bg-[#29a3a3] text-[18px] font-bold text-white text-center rounded w-full p-6 mb-4 cursor-pointer'>{isLogin ? 'Log in' : 'Sign up'}</button></Link>
                    <div className='bg-white text-sm font-bold text-slate-500 text-center border-2 border-slate-150 rounded w-full p-2'>{isLogin ? 'New to QuizMe?' : 'Already have an account?'}<button className='ml-1 text-[#3CCFCF] hover:text-[#29a3a3] cursor-pointer' onClick={toggleSignin}>{isLogin ? 'Create an account' : 'Log in'}</button></div>
                </div>
            </div>
    )
}