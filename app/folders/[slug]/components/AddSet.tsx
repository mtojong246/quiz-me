'use client';
import { Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeckCard from './DeckCard';
import { DeckContext } from '@/app/context/DeckContext';
import { useContext, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { FolderWithId } from '../page';

export default function AddSet({ checked, toggleChecked, id, folder, setFolder }: { checked: boolean, toggleChecked: () => void, id: number, folder: FolderWithId, setFolder: Dispatch<SetStateAction<FolderWithId>> }) {
    const { decks } = useContext(DeckContext);

    return (
        <Fade in={checked}>
            <div>
                <div className='fixed top-0 bottom-0 right-0 left-0 z-10 bg-slate-700 opacity-50 h-screen' onClick={toggleChecked}></div>
                <div className='fixed top-0 bottom-0 right-0 left-0 z-20 bg-slate-50 h-screen sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-65%] sm:h-fit sm:w-[600px] sm:rounded-xl'>
                    <div className='w-full p-4 sm:p-8 flex justify-between items-center bg-[#4255FF]'>
                        <p className='text-white text-[26px] sm:text-[30px] font-bold'>Add a set</p>
                        <button onClick={toggleChecked}><CloseIcon style={{fontSize: '24px', color: 'white'}}/></button>
                    </div>
                    <div className='w-full p-4 bg-slate-50 max-h-[90vh] overflow-y-scroll sm:max-h-[400px]'>
                        <Link href='/create-set'>
                            <button onClick={toggleChecked} className='w-full p-6 bg-white text-center text-slate-700 font-bold text-xsm sm:text-reg mb-10 hover:text-[#3CCFCF]'>
                                + CREATE NEW SET
                            </button>
                        </Link>
                        <div className='w-full flex flex-col justify-start items-center gap-5 mb-5 sm:mb-0'>
                            {decks && decks.map(deck => (
                                <DeckCard key={deck.id} title={deck.title} folder_id={deck.folder_id} deck_id={deck.id} id={id} folder={folder} setFolder={setFolder}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}