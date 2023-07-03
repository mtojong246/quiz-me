'use client';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { DeckType } from '@/app/context/DeckContext';
import { FolderType } from '@/app/context/FolderContext';
import { useState, useEffect, useContext } from 'react';
import useSave from '@/hooks/useSave';
import { FolderContext } from '@/app/context/FolderContext';
import CircularProgress from '@mui/material/CircularProgress';


const style = {
    fontSize: '20px'
}

export default function FolderCard({ deck, folder }: { deck: DeckType, folder: FolderType }) {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isChecked, setIsChecked ] = useState(false);
    const { addDeckToFolder, removeDeckFromFolder } = useSave();
    const { folders, setFolders } = useContext(FolderContext)

    useEffect(() => {
        if (deck.folder_id === folder.id) {
            return setIsChecked(true);
        }
        return setIsChecked(false);
    }, [deck.folder_id, folder.id])

    const handleClick = async () => {
        setIsLoading(true);
        if (!isChecked) {
            const response = await addDeckToFolder({ id: folder.id, deck_id: deck.id })
            if (response) {
                setIsChecked(true);
                const newFolders = folders.map(f => {
                    if (f.id === folder.id) return {
                        ...f,
                        decks: f.decks.concat({
                            title: deck.title,
                            description: deck.description as string | undefined,
                            cards: deck.cards,
                            id: deck.id,
                            folder_id: folder.id,
                        })
                    }
                    return { ...f }
                })
                setIsLoading(false);
                return setFolders(newFolders);
            }
            alert('Error adding deck to folder');
            setIsLoading(false);
            return;
        }
        const response = await removeDeckFromFolder({ deck_id: deck.id });
        if (response) {
            setIsChecked(false);
            const newFolders = folders.map(f => {
                if (f.id === folder.id) return {
                    ...f,
                    decks: f.decks.filter(d => d.id !== deck.id)
                }
                return { ...f }
            })
            setIsLoading(false);
            return setFolders(newFolders);
        }
        setIsLoading(false);
        alert("Error removing deck from folder");
        return; 
    }

    return (
        <div className='w-full bg-white flex justify-between items-center p-4'>
            <p className='text-lg text-slate-700 font-bold'>{folder.title}</p>
            <button onClick={handleClick} className='text-lg text-slate-700 px-3 py-1 border border-slate-200 hover:text-[#3CCFCF]'>
            {isLoading ? <CircularProgress color='inherit'/> : `${isChecked ? <CheckIcon color='inherit' style={style}/> : <AddIcon color='inherit' style={style}/>}`}
            </button>
        </div>
    )
}