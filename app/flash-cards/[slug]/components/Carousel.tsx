'use client';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { DeckType } from '@/app/create-set/page';
import { useState } from 'react';


export default function Carousel({ deck }: { deck: DeckType  }) {
    const { cards } = deck;
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ isNextDisabled, setIsNextDisabled ] = useState(false);
    const [ isPrevDisabled, setIsPrevDisabled ] = useState(false);

    const next = () => {
        if (currentIndex !== cards.length-1) {
            setCurrentIndex(currentIndex+1);
            return setIsNextDisabled(false);
        }
        return setIsNextDisabled(true);
    }

    const prev = () => {
        if (currentIndex !== 0) {
            setCurrentIndex(currentIndex-1);
            return setIsPrevDisabled(false);
        }
        return setIsPrevDisabled(true);
    }

    return (
        <div>
            <div className='w-full h-[320px] sm:h-[420px] flex flex-nowrap overflow-hidden mb-5'>
                {cards.map((card, index) => (
                    <div className='w-full min-w-full h-full bg-white flex justify-center items-center transition-transform' key={index} style={{transform: `translate(-${currentIndex * 100}%)`}}>
                        <p>{card.term}</p>
                    </div>
                ))}
            </div>
            <div className='w-full flex justify-center pb-5 items-center border-b-2 border-slate-300 mb-5 lg:mb-10'>
                <div className='flex justify-center items-center gap-4'>
                    <button disabled={isPrevDisabled} className='cursor-pointer' onClick={prev}><ArrowCircleLeftIcon style={{fontSize: '40px', color: `${isPrevDisabled ? '#b5b5b5' : '#595959'}`}}/></button>
                    <p className='font-bold text-sm text-slate-500'>{`${currentIndex+1}/${cards.length}`}</p>
                    <button disabled={isNextDisabled} className='cursor-pointer' onClick={next}><ArrowCircleRightIcon style={{fontSize: '40px', color: `${isNextDisabled ? '#b5b5b5' : '#595959'}`}}/></button>
                </div>
            </div>
        </div>
    )
}