'use client';
import { useContext, useState, useEffect, MouseEvent } from 'react';
import { DeckContext } from '../context/DeckContext';
import { AuthenticationContext } from '../context/AuthContext';
import Link from 'next/link';

export const LibraryMenu = () => {
    const { data } = useContext(AuthenticationContext);
    const { decks, isDeckLoading } = useContext(DeckContext);
    const [ isActive, setIsActive ] = useState('');

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if ((e.currentTarget as HTMLButtonElement).value === 'study-sets') {
            setIsActive('study-sets');
        } else if ((e.currentTarget as HTMLButtonElement).value === 'folders') {
            setIsActive('folders');
        }
        return;
    }

    useEffect(() => {
        setIsActive('study-sets');
    }, [])

    return (
        <div className='w-[400px] h-fit bg-white rounded-lg border border-slate-200 drop-shadow py-4 absolute left-[120px] top-[70px] z-10 hidden md:block'>
            <div className='flex justify-start items-center gap-5 px-4 pb-2 border-b-2 border-slate-300'>
                <button className='pb-2 cursor-pointer' onClick={handleClick} value='study-sets'><p className={`text-sm ${isActive === 'study-sets' ?'text-[#4255FF]':'text-slate-500'} font-bold cursor-pointer`}>Study sets</p></button>
                <button className='pb-2 cursor-pointer' onClick={handleClick} value='folders'><p className={`text-sm ${isActive === 'folders' ?'text-[#4255FF]':'text-slate-500'} font-bold cursor-pointer`}>Folders</p></button>
            </div>
            <div className='max-h-[300px] overflow-y-scroll'>
            {isDeckLoading ? (
                <h1>Loading...</h1>
            ): (
            <>
                {decks.map(deck => (
                    <Link href={`/flash-cards/${deck.title.replace(/\s+/g, '-').toLowerCase()}`} className="cursor-pointer">
                        <div className='w-full p-4 hover:bg-gray-200' key={deck.id}>
                            <p className='text-lg text-slate-700 font-bold'>{deck.title}</p>
                            <p className='text-xsm text-slate-300'>{data ? data.username : ''}</p>
                        </div>
                    </Link>
                ))}
            </>
            )}
            </div>
            <div className='px-4'>
                <button className='text-reg text-[#4255FF] hover:text-[#0017E6] font-bold cursor-pointer'>View all sets</button>
            </div>
        </div>
    )
}
