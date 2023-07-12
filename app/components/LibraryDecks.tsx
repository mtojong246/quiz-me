'use client';
import Link from 'next/link';
import { DeckContext } from '../context/DeckContext';
import { AuthenticationContext } from '../context/AuthContext';
import { useContext } from 'react';


export default function LibraryDecks({ toggleLibrary }: { toggleLibrary: () => void }) {
    const { data } = useContext(AuthenticationContext);
    const { decks } = useContext(DeckContext);
    return (
        <>
            {decks && decks.length ? (
            <>
            {decks.map(deck => (
                <Link href={`/flash-cards/${deck.title.replace(/\s+/g, '-').toLowerCase()}`} className="cursor-pointer" key={deck.id}>
                    <div className='w-full p-4 hover:bg-gray-200' onClick={toggleLibrary}>
                        <p className='text-lg text-slate-700 font-bold'>{deck.title}</p>
                        <p className='text-xsm text-slate-300'>{data ? data.username : ''}</p>
                    </div>
                </Link>
            ))}
            </>
                
            ): (
                <div className='w-full h-full flex flex-col justify-center items-center py-4'>
                    <p className='text-slate-500 font-bold'>Your sets will appear here.</p>
                    <Link href='/create-set'><button className='bg-[#3CCFCF] text-white text-sm font-bold rounded-lg px-5 py-2 mt-4'>Create set</button></Link>
                </div>
            )}
        </>
    )
}