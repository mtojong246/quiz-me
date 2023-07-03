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
            {!decks ? (
                <div className='w-full h-full flex flex-col justify-center items-center'>
                <p>Your sets will appear here.</p>
                <button>Create set</button>
            </div>
            ): (
            <>
                {decks.map(deck => (
                    <Link href={`/flash-cards/${deck.title.replace(/\s+/g, '-').toLowerCase()}`} className="cursor-pointer">
                        <div className='w-full p-4 hover:bg-gray-200' key={deck.id} onClick={toggleLibrary}>
                            <p className='text-lg text-slate-700 font-bold'>{deck.title}</p>
                            <p className='text-xsm text-slate-300'>{data ? data.username : ''}</p>
                        </div>
                    </Link>
                ))}
            </>
            )}
        </>
    )
}