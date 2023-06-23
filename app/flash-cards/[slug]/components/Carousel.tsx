'use client';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { DeckType } from '@/app/create-set/page';
import { useState } from 'react';
import Flashcard from './Flashcard';


export default function Carousel({ deck, expand }: { deck: DeckType, expand: boolean  }) {
    const { cards } = deck;
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ isNextDisabled, setIsNextDisabled ] = useState(false);
    const [ isPrevDisabled, setIsPrevDisabled ] = useState(false);
    const [ changeCard, setChangeCard ] = useState(false);

    const next = () => {
        setChangeCard(true);
        if (currentIndex !== cards.length-1) {
            setCurrentIndex(currentIndex+1);
        }
    }

    const prev = () => {
        setChangeCard(true);
        if (currentIndex !== 0) {
            setCurrentIndex(currentIndex-1);
        }
    }

    return (
        <>
            <div className={`w-full ${expand ? 'h-[70vh]' : 'h-[320px] sm:h-[420px]'} flex flex-nowrap overflow-hidden mb-5 rounded-lg`}>
                {cards.map((card, index) => ( 
                    <Flashcard currentIndex={currentIndex} card={card} index={index} changeCard={changeCard} setChangeCard={setChangeCard}/>
                ))}
            </div>
            <div className='w-full flex justify-center pb-5 items-center border-b-2 border-slate-300 mb-5 lg:mb-10'>
                <div className='flex justify-center items-center gap-4'>
                    <button disabled={isPrevDisabled} className='cursor-pointer' onClick={prev}><ArrowCircleLeftIcon style={{fontSize: '40px', color: `${isPrevDisabled ? '#b5b5b5' : '#595959'}`}}/></button>
                    <p className='font-bold text-sm text-slate-500'>{`${currentIndex+1}/${cards.length}`}</p>
                    <button disabled={isNextDisabled} className='cursor-pointer' onClick={next}><ArrowCircleRightIcon style={{fontSize: '40px', color: `${isNextDisabled ? '#b5b5b5' : '#595959'}`}}/></button>
                </div>
            </div>
        </>
    )
}