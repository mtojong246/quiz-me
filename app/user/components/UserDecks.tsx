'use client';
import { useContext } from 'react';
import { DeckContext } from '@/app/context/DeckContext';

export default function UserDecks() {
    const { decks } = useContext(DeckContext)

    return (
        <>
        {decks && (
            <>
                <div className='w-full text-right mb-6'>
                    <input className='w-full max-w-[600px] p-4 bg-white rounded-lg mb-6' type='text' placeholder='Search your sets'/>
                </div>
                <div className='w-full flex flex-col gap-4 justify-center items-center pb-6'>
                {decks.map(deck => (
                    <div className='w-full bg-white p-5' key={deck.id}>
                        <p className='text-sm font-bold text-slate-700 mb-2'>{deck.cards.length ? deck.cards.length : 0} terms</p>
                        <p className='text-lg font-bold text-slate-700'>{deck.title}</p>
                    </div>
                ))}
                </div>
            </>
        )}
        </>
    )
}