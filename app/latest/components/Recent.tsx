'use client';
import { useContext } from 'react';
import { DeckContext } from '@/app/context/DeckContext';
import Card from './Card';

export default function Recent() {
    const { decks, isDeckLoading } = useContext(DeckContext);

    return (
        <>
        {isDeckLoading ? (
            <h1>Loading...</h1>
        ) : (
            <>
                {decks.length ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {decks.map((deck, index) => {
                        if (index < 6) {
                            return <Card key={deck.id} title={deck.title} terms={`${deck.cards ? deck.cards.length : 0}`}/>
                        } 
                        return null;
                    })}
                    </div>
                ) : (
                    <div className='p-8 rounded drop-shadow bg-white text-center'>
                        <p className='text-lg text-slate-700 font-bold mb-1'>You have no study sets yet</p>
                        <p className='text-reg text-slate-700 font-light'>Sets you create or study will display here</p>
                    </div>
                )}
            </>
        )}
        </>
    )
}