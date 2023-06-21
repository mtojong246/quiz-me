'use client';
import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface Deck {
    title: string;
    description: string;
    cards: Card[];
}

interface Card {
    id: number;
    term: string;
    definition: string;
}

export const Card = ({ num, deck, setDeck }: { num: number, deck: Deck, setDeck: Dispatch<SetStateAction<Deck>> }) => {
    const [ card, setCard ] = useState({
        id: num,
        term: '',
        definition: '',
    });

    const [ disabled, setDisabled ] = useState(false);

    const { term, definition } = card;
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        setCard({
            ...card,
            [name]: value,
        })
    }

    const removeCard = () => {
        const newCards = deck.cards.filter(c => c.id !== card.id);
        const sortedCards = newCards.map(c => {
            if (c.id > card.id) {
                return {
                    ...c,
                    id: (c.id)-1,
                }
            }
            return { ...c }
        })

        const newDeck = {
            ...deck,
            cards: sortedCards,
        }

        setDeck(newDeck);
    }

    useEffect(() => {
        const newDeck = {
            ...deck,
            cards: deck.cards.map(c => {
                if (c.id === card.id) {
                    return {
                        ...c,
                        term,
                        definition,
                    }
                }
                return { ...c }
            })
        }

        setDeck(newDeck);

    }, [term, definition]);

    useEffect(() => {
        if (deck.cards.length <= 2) {
            return setDisabled(true);
        }
        return setDisabled(false);
    }, [deck.cards.length])


    return (
        <div className='bg-white rounded-lg w-full'>
            <div className='flex justify-between items-center py-4 px-6'>
                <p className='text-reg text-slate-500 font-bold'>{num}</p>
                <button onClick={removeCard} disabled={disabled} className='cursor-pointer'><DeleteOutlineIcon style={{fontSize: '20px', color: `${disabled ? '#b5b5b5' : '#595959'}`}}/></button>
            </div>
            <div className='p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-center sm:justify-evenly items-center gap-4'>
                <div className='w-full sm:pr-5'>
                    <input type='text' className='w-full text-slate-700 text-reg py-1 border-b border-slate-400' placeholder='Enter term' name='term' value={term} onChange={handleChange}/>
                    <p className='text-xsm text-slate-500 font-bold mt-1'>TERM</p>
                </div>
                <div className='w-full sm:pl-5'>
                    <input type='text' className='w-full text-slate-700 text-reg py-1 border-b border-slate-400' placeholder='Enter definition' name='definition' value={definition} onChange={handleChange}/>
                    <p className='text-xsm text-slate-500 font-bold mt-1'>DEFINITION</p>
                </div>
            </div>
            <div className='flex justify-end items-center p-4 mt-5'>
                <MoreVertIcon style={{fontSize: '20px', color: '#595959'}} className='cursor-pointer'/>
            </div>
        </div>
    )
}