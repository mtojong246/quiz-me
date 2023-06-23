'use client';

import FilterIcon from '@mui/icons-material/Filter';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import MiniCard from './components/MiniCard';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useContext, useEffect, useState } from 'react';
import Carousel from './components/Carousel';
import { DeckContext } from '@/app/context/DeckContext';
import { DeckType } from '@/app/create-set/page';
import Fullscreen from './components/Fullscreen';

export default function FlashCards({ params }: { params: { slug: string } }) {
    const separatedTitle = params.slug.replace(/-/g, ' ');
    const { decks } = useContext(DeckContext)
    const [ deck, setDeck ] = useState({} as DeckType);
    const [ expand, setExpand ] = useState(false);

    const toggleExpand = () => setExpand(!expand);

    useEffect(() => {
        const foundDeck = decks.find(deck => deck.title.toLowerCase() === separatedTitle.toLowerCase());
        console.log(foundDeck)
        if (foundDeck) {
            setDeck(foundDeck);
        }
        
    }, [decks]);

    return (
        <>
        {!deck.cards ? (
            <h1>Loading...</h1>
        ) : (
            <>
                <div className='bg-slate-50 p-4 sm:p-8'>
                    <div className='max-w-[1200px] mx-auto mb-20'>
                        <div className='w-full flex justify-between items-center mb-10'>
                            <p className='text-xl sm:text-xxl text-slate-700 font-bold'>{separatedTitle}</p>
                            <button className='px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-500 text-sm font-bold'>Share</button>
                        </div>
                        <div className='flex flex-col lg:flex-col-reverse mb-10'>
                            <div>
                                <Carousel deck={deck} expand={expand}/>
                            </div>
                            <div className='w-full grid grid-cols-2 gap-4 mb-10 lg:mb-5'>
                                <button onClick={toggleExpand} className='h-[60px] bg-white rounded-lg drop-shadow flex justify-center items-center cursor-pointer'>
                                    <p className='font-bold text-sm text-slate-500'><FilterIcon className='mr-3' style={{fontSize: '24px', color: '#4255FF'}}/>Flashcards</p>
                                </button>
                                <button className='h-[60px] bg-white rounded-lg drop-shadow flex justify-center items-center cursor-pointer'>
                                    <p className='font-bold text-sm text-slate-500'><RotateRightIcon className='mr-3' style={{fontSize: '24px', color: '#4255FF'}}/>Learn</p>
                                </button>
                            </div>
                        </div>
                        <div className='w-full flex justify-between items-center mb-10'>
                            <div></div>
                            <div>
                                <button className='border border-slate-300 rounded-lg bg-white p-2 cursor-pointer'><ModeEditIcon style={{fontSize: '24px', color: '#595959'}}/></button>
                            </div>
                        </div>
                        <div className='w-full mb-10'>
                            <p className='text-lg font-bold text-slate-700 mb-5'>{`Terms in this set ()`}</p>
                            <div className='flex flex-col justify-center items-center gap-4'>
                                {deck.cards.map(card => (
                                    <MiniCard key={card.id} term={card.definition} definition={card.term}/>
                                ))}
                            </div>
                        </div>
                        <div className='w-full text-center'>
                            <button className='bg-[#4255FF] hover:bg-[#0017E6] text-white text-reg font-bold px-8 py-5 rounded-lg cursor-pointer'>Add or Remove Terms</button>
                        </div>
                    </div>
                </div>
                {expand && <Fullscreen expand={expand} toggleExpand={toggleExpand} deck={deck}/>}
            </>
        )}
        </>
    )
}
