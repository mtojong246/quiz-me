'use client';
import { DeckType } from "@/app/context/DeckContext";
import { useState, useEffect, ChangeEvent } from "react";
import { CardType } from "@/app/context/DeckContext";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


export default function Learn({ deck, toggleExpand }: { deck: DeckType, toggleExpand: () => void }) {
    const [ array, setArray ] = useState<number[]>([]);
    const [ currentCard, setCurrentCard ] = useState<CardType>({} as CardType);
    const [ done, setDone ] = useState(false);
    const [ input, setInput ] = useState('');
    const [ isCorrect, setIsCorrect ] = useState(false);
    const [ isWrong, setIsWrong ] = useState(false);
    const [ isNeutral, setIsNeutral ] = useState(false);
    const { cards } = deck;
    
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
    }, [])

    useEffect(() => {
        const card = cards.find(c => cards.indexOf(c) === array[0]);
        console.log(cards, array)
        if (card) {
            return setCurrentCard(card);
        }
        return;
    }, [array]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const handleAnswer = (input: string) => {
        if (input.toLowerCase().trim() == currentCard.term.toLowerCase().trim()) {
            return setIsCorrect(true);
        }
        return setIsWrong(true);
    }

    const handleNeutral = () => {
        setIsNeutral(true);
    }

    const handleContinue = () => {
        setIsCorrect(false);
        setIsWrong(false);
        setIsNeutral(false);
        array.shift();
        setInput('');

        if (!array.length) {
            setDone(true);
        }
    }

    return (
        <>
        {done ? (
            <div className='w-full h-[500px] bg-white rounded-lg p-8 flex flex-col justify-center items-center'>
                <img src='/trophy.svg' className='h-20 w-20 mb-5' />
                <p className='text-slate-700 text-xxl font-bold mb-3'>Congrats! You've studied everything.</p>
                <p className='text-slate-400 mb-5'>Study again to practice the same questions or try another study mode.</p>
                <div className='flex justify-center align-center gap-5'>
                    <button className='cursor-pointer px-6 py-3 border rounded-lg border-slate-300 text-slate-500 font-bold' onClick={toggleExpand}>Finish Learn</button>
                    <button className='cursor-pointer px-6 py-3 rounded-lg text-white font-bold bg-[#4255FF]' onClick={() => {setNewArray(); setDone(false)}}>Study again</button>
                </div>
            </div>
        ) : (
            <div className='w-full h-[500px] bg-white rounded-lg p-8 flex flex-col justify-between items-start'>
                <div className='w-full'>   
                    <p className='text-slate-500 text-sm font-bold mb-5'>Definition</p>
                    <p className='text-slate-700 text-reg'>{currentCard.definition}</p>
                </div>
                <div className='w-full'>
                    {isCorrect ? (
                        <>
                            <p className='text-slate-500 text-sm font-bold mb-5'>Nice work!</p>
                            <div className='mb-5'><Alert variant="outlined" severity='success' icon={<CheckIcon fontSize="inherit" />}>{input}</Alert></div>
                        </>
                    ) : (
                        <>
                        {isWrong ? (
                            <>
                                <p className='text-slate-500 text-sm font-bold mb-5'>No worries, you're still learning!</p>
                                <div className='mb-5'><Alert variant="outlined" severity='error' icon={<CloseIcon fontSize="inherit"/>}>{input}</Alert></div>
                                <p className='text-slate-500 text-sm font-bold mb-5'>Correct answer</p>
                                <div className='mb-5'><Alert variant="outlined" severity='success' icon={<CheckIcon fontSize="inherit" />}>{currentCard.term}</Alert></div>
                            </>
                        ) : (
                            <>
                            {isNeutral ? (
                                <>
                                    <p className='text-slate-500 text-sm font-bold mb-5'>Give this one a try later!</p>
                                    <div className='mb-5'><Alert variant="outlined" severity='info' icon={<CloseIcon fontSize="inherit"/>}>{input}</Alert></div>
                                    <p className='text-slate-500 text-sm font-bold mb-5'>Correct answer</p>
                                    <div className='mb-5'><Alert variant="outlined" severity='success' icon={<CheckIcon fontSize="inherit" />}>{currentCard.term}</Alert></div>
                                </>
                            ) : (
                                <>
                                    <p className='text-slate-500 text-sm font-bold mb-5'>Your answer</p>
                                    <input onChange={handleChange} value={input} type='text' placeholder="Type your answer" className='p-4 text-reg bg-slate-100 text-slate-700 mb-10 w-full rounded-lg' />
                                </>
                            )}
                            </>
                        )}
                        </>
                    )}
                    <div className='w-full text-right'>
                        {isCorrect || isWrong || isNeutral ? (
                            <button onClick={handleContinue} className='bg-[#4255FF] px-5 py-3 text-white text-sm font-bold rounded-lg'>Continue</button>
                        ) : (   
                        <>
                            <button className='text-[#4255FF] text-sm font-bold mr-8' onClick={() => handleNeutral()}>Don't know?</button>
                            <button onClick={() => handleAnswer(input)} className='bg-[#4255FF] px-5 py-3 text-white text-sm font-bold rounded-lg'>Answer</button>
                        </>
                        )}
                    </div>
                </div>
            </div>
        )}
        </>
    )
}