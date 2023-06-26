'use client';
import { useContext, useState, useEffect, ChangeEvent } from 'react';
import { DeckContext } from '@/app/context/DeckContext';
import { DeckBasic } from '@/app/context/DeckContext';
import { Card } from './components/Card';
import { useRouter } from 'next/navigation';
import useSave from '@/hooks/useSave';

export interface DeckWithId extends DeckBasic {
    id: number;
}

export default function Edit({ params }: { params: { slug: string } }) {
    const separatedTitle = params.slug.replace(/-/g, ' ');
    const { decks, setDecks } = useContext(DeckContext)
    const [ deck, setDeck ] = useState({} as DeckWithId);
    const { editDeck } = useSave();
    const router = useRouter();

    const { title, description, cards } = deck;

    useEffect(() => {
        const foundDeck = decks.find(deck => deck.title.toLowerCase() === separatedTitle.toLowerCase());
        if (foundDeck) {
            const { id, title, description, cards } = foundDeck;
            setDeck({ id, title, description: description as string, cards })
        }
        
    }, [decks]);

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

    const handleEdit = async () => {
        try {
            const response = await editDeck({ deck });
            if (response) {
                const newDecks = decks.filter(deck => deck.id !== response.id);
                setDecks(newDecks.concat(response))
                return router.push('/latest');
            }
            console.log('Error editing deck');
            return;
        } catch (error) {
            console.log(error);
            return
        }
    }

    return (
        <>
        {cards ? (
        <div className='bg-slate-50 p-4 sm:p-8'>
            <div className='max-w-[1200px] mx-auto mb-20'>
                <div className='flex justify-between items-center mb-20'>
                    <p className='text-med font-bold text-slate-700 sm:text-[30px]'>Edit set</p>
                    <button className='bg-[#4255FF] hover:bg-[#0017E6] px-4 sm:px-8 py-2 sm:py-4 rounded-lg cursor-pointer text-white text-xsm sm:text-sm font-bold'>Done</button>
                </div>
                <div className='flex flex-col gap-10'>
                    <input name='title' value={title} onChange={handleTitle} type="text" className='w-full text-slate-700 text-reg rounded-lg bg-white p-4' placeholder='Enter a title like "Biology - Chapter 22: Evolution"'/>
                    <textarea name='description' value={description} onChange={handleDescription} className='w-full text-slate-700 text-sm rounded-lg bg-white p-4 h-[120px]' placeholder='Add description...' />
                </div>
            </div>
            <div className='max-w-[1200px] mx-auto flex flex-col justify-center items-center gap-5'>
            {cards.map((card, i) => (
                <Card key={i} num={i} card={card} deck={deck} setDeck={setDeck}/>
            ))}
            </div>
            <div className='max-w-[1200px] mx-auto my-5'>
                <div className='bg-white rounded-lg w-full p-6 text-center cursor-pointer group' onClick={addCard}>
                    <p className='text-sm text-slate-500 font-bold group-hover:text-[#3CCFCF]'>+ ADD CARD</p>
                </div>
            </div>
            <div className='max-w-[1200px] mx-auto flex justify-end items-center'>
                <button className='bg-[#4255FF] hover:bg-[#0017E6] px-8 py-5 rounded-lg cursor-pointer text-white font-bold' onClick={handleEdit}>Done</button>
            </div>
        </div>
        ) : (
            <h1>Loading...</h1>
        )}
        </>
    )
}