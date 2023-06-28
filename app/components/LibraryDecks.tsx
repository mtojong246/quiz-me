'use client';
import Link from 'next/link';
import { DeckContext } from '../context/DeckContext';
import { AuthenticationContext } from '../context/AuthContext';
import { useContext } from 'react';


export default function LibraryDecks() {
    const { data } = useContext(AuthenticationContext);
    const { decks, isDeckLoading } = useContext(DeckContext);
    return (
        <>
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
        </>
    )
}