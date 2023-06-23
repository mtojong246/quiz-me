'use client';
import { CardType } from "@/app/context/DeckContext";
import { useState, Dispatch, SetStateAction } from "react";

export default function Flashcard({ currentIndex, card, index, changeCard, setChangeCard }: { currentIndex: number, card: CardType, index: number, changeCard: boolean, setChangeCard: Dispatch<SetStateAction<boolean>> }) {
    const [ isFlipped, setIsFlipped ] = useState(false);

    const toggleIsFlipped = () => {
        setIsFlipped(!isFlipped);
    }

    console.log(isFlipped, index)

    return (
        <div className={`w-full min-w-full h-full cursor-pointer transition-transform duration-500 ease-in`} style={{transform: `translate(-${currentIndex * 100}%)`}} key={index} onClick={toggleIsFlipped}>
            <div className='w-full h-full bg-white flex justify-center items-center'>
                {isFlipped ? card.definition : card.term}
            </div>
        </div>
    )
}

//style={{transform: `translate(-${currentIndex * 100}%)`}}
//style={{transform: `${changeCard ? `translate(-${currentIndex * 100}%)` : ''}  `}}