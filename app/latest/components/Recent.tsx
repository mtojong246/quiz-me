'use client';
import { useContext, useEffect, useState } from 'react';
import { DeckContext } from '@/app/context/DeckContext';
import Card from './Card';
import { DeckType } from '@/app/context/DeckContext';

const numArray = [1,2,3,4,5,6];

export default function Recent() {
    const { decks, isDeckLoading } = useContext(DeckContext);
    const [ sortedDecks, setSortedDecks ] = useState<DeckType[]>([])

    useEffect(() => {
        if (decks) {
            const filteredDecks: Date[] = [];
            decks.forEach(deck => {
                const created = new Date(deck.created_at).getTime();
                const updated = new Date(deck.updated_at).getTime();
                if (created > updated) {
                    filteredDecks.push(deck.created_at);
                } else {
                    filteredDecks.push(deck.updated_at);
                }
            })
            const sortedByDate = filteredDecks.sort((a, b) => {
                const date1 = new Date(a).getTime();
                const date2 = new Date(b).getTime();
                return date2 - date1;
            })
            const newDeck = sortedByDate.map(date => (
                decks.find(deck => deck.created_at === date || deck.updated_at === date)
            ))
            if (newDeck) return setSortedDecks(newDeck as DeckType[]);
        }
    }, [decks])

    return (
        <>
        {isDeckLoading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {numArray.map(num => (
                <div key={num} className='h-[156px] bg-slate-200 rounded animate-pulse'></div>
            ))}
            </div>
        ) : (
            <>
                {!sortedDecks.length ? (
                    <div className='p-8 rounded drop-shadow bg-white text-center'>
                        <p className='text-lg text-slate-700 font-bold mb-1'>You have no study sets yet</p>
                        <p className='text-reg text-slate-700 font-light'>Sets you create or study will display here</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {sortedDecks.map((deck, index) => {
                        if (index < 6) {
                            return <Card key={deck.id} title={deck.title} terms={`${deck.cards ? deck.cards.length : 0}`}/>
                        } 
                        return null;
                    })}
                    </div>
                )}
            </>
        )}
        </>
    )
}