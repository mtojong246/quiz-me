'use client';
import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DeckWithId } from '../page';
import { CardType } from '@/app/context/DeckContext';

export const Card = ({ num, card, deck, setDeck }: { num: number, card: CardType, deck: DeckWithId, setDeck: Dispatch<SetStateAction<DeckWithId>> }) => {
    const [ newCard, setNewCard ] = useState({
        id: num,
        term: card.term,
        definition: card.definition,
    });

    const [ disabled, setDisabled ] = useState(false);

    const { term, definition } = newCard;
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        setNewCard({
            ...newCard,
            [name]: value,
        })
    }

    const removeCard = () => {
        const newCards = deck.cards.filter(c => deck.cards.indexOf(c) !== (num));

        const newDeck = {
            ...deck,
            cards: newCards,
        }

        setDeck(newDeck);
    }

    useEffect(() => {
        setNewCard({
            id: num,
            term: card.term,
            definition: card.definition, 
        })
    }, [deck.cards.length])

    useEffect(() => {
        const newDeck = {
            ...deck,
            cards: deck.cards.map(c => {
                if (deck.cards.indexOf(c) === (num)) {
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
                <p className='text-reg text-slate-500 font-bold'>{num+1}</p>
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