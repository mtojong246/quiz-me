'use client';
import { useContext } from 'react';
import { AuthenticationContext } from '@/app/context/AuthContext';
import Card from './Card';

export default function Recent() {
    const { data } = useContext(AuthenticationContext);

    return (
        <>
        {data?.decks?.length ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {data.decks.map((deck, index) => {
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
    )
}