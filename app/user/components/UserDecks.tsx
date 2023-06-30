'use client';
import { useContext, useState, useEffect, ChangeEvent } from 'react';
import { DeckContext } from '@/app/context/DeckContext';
import Link from 'next/link';
import { DeckType } from '@/app/context/DeckContext';

export default function UserDecks() {
    const { decks } = useContext(DeckContext);
    const [ filteredDecks, setFilteredDecks ] = useState<DeckType[]>(decks);
    const [ input, setInput ] = useState('')

    useEffect(() => {
        setFilteredDecks(decks);
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newInput = e.target.value;
        let newDecks = decks.filter(deck => deck.title.toLowerCase().includes(newInput.toLowerCase()));
        setInput(newInput);
        setFilteredDecks(newDecks);
    }

    return (
        <>
        {filteredDecks && (
            <>
                <div className='w-full text-right mb-6'>
                    <input onChange={handleChange} value={input} className='w-full max-w-[600px] p-4 bg-white rounded-lg mb-6' type='text' placeholder='Search your sets'/>
                </div>
                <div className='w-full flex flex-col gap-4 justify-center items-center pb-6'>
                {filteredDecks.map(deck => (
                    <Link href={`/flash-cards/${deck.title.replace(/\s+/g, '-').toLowerCase()}`} className='w-full'>
                        <div className='w-full bg-white p-5' key={deck.id}>
                            <p className='text-sm font-bold text-slate-700 mb-2'>{deck.cards.length ? deck.cards.length : 0} terms</p>
                            <p className='text-lg font-bold text-slate-700'>{deck.title}</p>
                        </div>
                    </Link>
                ))}
                </div>
            </>
        )}
        </>
    )
}