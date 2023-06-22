'use client';
import { Card } from './components/Card';
import { initialSet } from '@/data/mockData';
import { useState, ChangeEvent, useContext } from 'react';
import useSave from '@/hooks/useSave';
import { AuthenticationContext } from '../context/AuthContext';
import { CardType } from '../context/DeckContext';
import { DeckContext } from '../context/DeckContext';

export interface DeckType {
    title: string,
    description: string, 
    cards: CardType[],
}

export default function CreateSet() {
    const { data } = useContext(AuthenticationContext);
    const { setDecks }= useContext(DeckContext);
    const { createDeck } = useSave();
    const [ deck, setDeck ] = useState<DeckType>({
        title: '',
        description: '',
        cards: initialSet.map(set => {
            return {
                id: set.id,
                term: '',
                definition: '',
            }
        }),
    });

    const { title, description, cards } = deck;

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setDeck({
            ...deck,
            title: e.currentTarget.value.toLowerCase(),
        })
    }

    const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDeck({
            ...deck,
            description: e.currentTarget.value
        })
    }

    const addCard = () => {
        const lastIndex = cards[deck.cards.length-1].id;
        const newDeck = {
            ...deck,
            cards: cards.concat({
                id: lastIndex+1,
                term: '',
                definition: '',
            })
        }
        
        setDeck(newDeck);
    }

    const handleCreate = async () => {
        if (data) {
            const id = data.id;
            const response = await createDeck({deck, id});
            if (response) {
                setDecks(response);
            }
            return;
        }
        console.log('error, no user data available');
        return;
    }

    return (
        <div className='bg-slate-50 p-4 sm:p-8'>
            <div className='max-w-[1200px] mx-auto mb-20'>
                <div className='flex justify-between items-center mb-20'>
                    <p className='text-med font-bold text-slate-700 sm:text-[30px]'>Create a new set</p>
                    <button className='bg-[#4255FF] hover:bg-[#0017E6] px-4 sm:px-8 py-2 sm:py-4 rounded-lg cursor-pointer text-white text-xsm sm:text-sm font-bold'>Create</button>
                </div>
                <div className='flex flex-col gap-10'>
                    <input name='title' value={title} onChange={handleTitle} type="text" className='w-full text-slate-700 text-reg rounded-lg bg-white p-4' placeholder='Enter a title like "Biology - Chapter 22: Evolution"'/>
                    <textarea name='description' value={description} onChange={handleDescription} className='w-full text-slate-700 text-sm rounded-lg bg-white p-4 h-[120px]' placeholder='Add description...' />
                </div>
            </div>
            <div className='max-w-[1200px] mx-auto flex flex-col justify-center items-center gap-5'>
            {cards.map(c => (
                <Card key={c.id} num={c.id} deck={deck} setDeck={setDeck}/>
            ))}
            </div>
            <div className='max-w-[1200px] mx-auto my-5'>
                <div className='bg-white rounded-lg w-full p-6 text-center cursor-pointer group' onClick={addCard}>
                    <p className='text-sm text-slate-500 font-bold group-hover:text-[#3CCFCF]'>+ ADD CARD</p>
                </div>
            </div>
            <div className='max-w-[1200px] mx-auto flex justify-end items-center'>
                <button className='bg-[#4255FF] hover:bg-[#0017E6] px-8 py-5 rounded-lg cursor-pointer text-white font-bold' onClick={handleCreate}>Create</button>
            </div>
        </div>
    )
}