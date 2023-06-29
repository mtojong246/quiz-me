'use client';
import { useState, useEffect, MouseEvent } from 'react';
import UserDecks from './components/UserDecks';
import UserFolders from './components/UserFolders';

export default function User({ params }: { params: { slug: string } }) {
    const [ isActive, setIsActive ] = useState(params.slug);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if ((e.currentTarget as HTMLButtonElement).value === 'study-sets') {
            setIsActive('study-sets');
        } else if ((e.currentTarget as HTMLButtonElement).value === 'folders') {
            setIsActive('folders');
        }
        return;
    }

    useEffect(() => {
        setIsActive(params.slug);
    }, [])

    return (
        <div className='w-full bg-slate-50 min-h-screen'>
            <div className='max-w-[1200px] mx-auto'>
                <div className='w-full p-4 sm:p-6 flex justify-start items-center mb-6'>
                    <div className='rounded-full bg-white h-[64px] w-[64px] mr-6'></div>
                    <p className='text-xl text-slate-700 font-bold'>username</p>
                </div>
                <div className='w-full p-4 sm:p-6'>
                    <div className='flex justify-start items-center gap-5 pb-2 border-b-2 border-slate-300'>
                        <button onClick={handleClick} className='pb-2 cursor-pointer' value='study-sets'><p className={`text-sm font-bold cursor-pointer ${isActive === 'study-sets' ? 'text-slate-700' : 'text-slate-400'}`}>Study sets</p></button>
                        <button onClick={handleClick} className='pb-2 cursor-pointer' value='folders'><p className={`text-sm font-bold cursor-pointer ${isActive === 'folders' ? 'text-slate-700' : 'text-slate-400'}`}>Folders</p></button>
                    </div>
                </div>
                <div className='w-full px-4 sm:px-6 mb-6'>
                {isActive === 'study-sets' ? (
                    <UserDecks />
                ) : (
                    <UserFolders />
                )}
                </div>
            </div>
        </div>
    )
}