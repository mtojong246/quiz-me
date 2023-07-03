'use client';
import { Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { DeckContext } from '@/app/context/DeckContext';
import CircularProgress from '@mui/material/CircularProgress';

import useDelete from '@/hooks/useDelete';
import { DeckWithId } from '@/app/context/FolderContext';

export default function DeleteCard({ isDelete, toggleDelete, deck }: { isDelete: boolean, toggleDelete: () => void, deck: DeckWithId}) {
    const [ isLoading, setIsLoading ] = useState(false);
    const { title, id } = deck;
    const router = useRouter();
    const { deleteDeck } = useDelete();
    const { decks, setDecks } = useContext(DeckContext)

    const handleDelete = async () => {
        setIsLoading(true);
        const response = await deleteDeck({ id });
        if (response) {
            const newDecks = decks.filter(deck => deck.id !== response.id)
            setDecks(newDecks);
            setIsLoading(false);
            return router.push('/latest');
        }
        setIsLoading(false);
        alert('Error deleting deck');
        return;
    }

    return (
        <Fade in={isDelete}>
            <div>
                <div className='fixed top-0 bottom-0 right-0 left-0 z-10 bg-slate-700 opacity-50 h-screen' onClick={toggleDelete}></div>
                <div className='fixed top-0 bottom-0 right-0 left-0 z-20 bg-slate-50 h-screen sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-65%] sm:h-fit sm:w-[600px] sm:rounded-xl'>
                    <div className='w-full p-4 sm:p-8 flex justify-between items-center bg-[#4255FF]'>
                        <p className='text-white text-[26px] sm:text-[30px] font-bold'>Delete this set?</p>
                        <button onClick={toggleDelete}><CloseIcon style={{fontSize: '24px', color: 'white'}}/></button>
                    </div>
                    <div className='w-full p-4 sm:p-8 bg-slate-50'>
                        <p className='mb-6 text-[26px] sm:text-[30px] text-slate-700 font-bold'>{title}</p>
                        <p className='text-reg text-slate-700 mb-8'>You are about to delete this set and all of its data. No one will be able to access this set ever again. <strong>Are you absolutely positive? There's no undo.</strong></p>
                        <div className='flex flex-col justify-center items-center sm:flex-row sm:justify-between gap-4'>
                            <button onClick={toggleDelete} className='w-full sm:w-[250px] py-5 bg-[#303545] text-white font-bold rounded'>Cancel</button>
                            <button onClick={handleDelete} className='w-full sm:w-[250px] py-5 bg-[#FF725B] text-white font-bold rounded'>
                            {isLoading ? <CircularProgress color='inherit'/> : 'Yes, delete set'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}