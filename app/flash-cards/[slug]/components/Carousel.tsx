'use client';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { DeckBasic } from '@/app/context/DeckContext';
import { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import { CardType } from '@/app/context/DeckContext';
import ShuffleIcon from '@mui/icons-material/Shuffle';


export default function Carousel({ deck, expand, toggleExpand }: { deck: DeckBasic, expand: boolean, toggleExpand: () => void }) {
    const { cards } = deck;
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ changeCard, setChangeCard ] = useState(false);

    const [ array, setArray ] = useState<number[]>([]);
    const [ done, setDone ] = useState(false);

    const next = () => {
        setChangeCard(true);
        if (currentIndex !== cards.length-1) {
            setCurrentIndex(currentIndex+1);
        } else {
            setDone(true);
        }
    }

    const prev = () => {
        setChangeCard(true);
        if (currentIndex !== 0) {
            setCurrentIndex(currentIndex-1);
        }
    }

    const create = () => {
        let emptyArray = [];
        for (let i=0; i<cards.length; i++) {
            emptyArray.push(i+1);
        }
        return emptyArray;
    }

    const shuffle = (array: number[]) => {
        for (let i = array.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
        }
        return array; 
    }

    const setNewArray = () => {
        const newArray = create();
        const shuffledArray = shuffle(newArray);
        setArray(shuffledArray);
    }

    useEffect(() => {
        setNewArray();
    }, []);

    return (
        <>
        {array.length ? (
            <>
            {done ? (
                <div className={`w-full ${expand ? 'h-[70vh]' : 'h-[320px] sm:h-[420px]'} flex flex-col justify-center items-center mb-5`}>
                    <img src='/party-horn.svg' className='h-20 w-20 mb-5' />
                    <p className='text-slate-700 text-xxl font-bold mb-3'>Way to go! You've reviewed all the cards.</p>
                    <p className='text-slate-400 mb-5'>Study the flaschards again or try another study mode.</p>
                    <div className='flex justify-center align-center gap-5'>
                        {expand ? (
                        <>
                            <button className='cursor-pointer px-6 py-3 border rounded-lg border-slate-300 text-slate-500 font-bold' onClick={toggleExpand}>Finish Flashcards</button>
                            <button className='cursor-pointer px-6 py-3 rounded-lg text-white font-bold bg-[#4255FF]' onClick={() => {setNewArray(); setDone(false); setCurrentIndex(0)}}>Study again</button>
                        </>
                        ) : (
                            <button className='cursor-pointer px-6 py-3 rounded-lg text-white font-bold bg-[#4255FF]' onClick={() => {setNewArray(); setDone(false); setCurrentIndex(0)}}>Study again</button>
                        )}
                        </div>    
                </div>
            ) : (
                <div className={`w-full ${expand ? 'h-[70vh]' : 'h-[320px] sm:h-[420px]'} flex flex-nowrap overflow-hidden mb-5 rounded-lg`}>
                    {array.map(i => {
                        let card = cards.find(c => cards.indexOf(c) === (i-1));
                        return (
                            <Flashcard currentIndex={currentIndex} card={card as CardType} index={i} changeCard={changeCard} setChangeCard={setChangeCard}/>
                        )
                    })}
                </div>
            )}
            <div className='w-full flex justify-between pb-5 items-center border-b-2 border-slate-300 mb-5 lg:mb-10'>
                <div></div>
                <div className='flex justify-center items-center gap-4'>
                    <button className='cursor-pointer' onClick={prev}><ArrowCircleLeftIcon style={{fontSize: '40px', color: '#595959'}}/></button>
                    <p className='font-bold text-sm text-slate-500'>{`${currentIndex+1}/${cards.length}`}</p>
                    <button className='cursor-pointer' onClick={next}><ArrowCircleRightIcon style={{fontSize: '40px', color: '#595959'}}/></button>
                </div>
                <button className='cursor-pointer' onClick={() => {setNewArray(); setCurrentIndex(0)}}><ShuffleIcon style={{fontSize: '32px', color: '#595959'}}/></button>
            </div>
            </>
        ) : (
            <></>
        )}
        </>
    )
}