'use client';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import useSave from '@/hooks/useSave';
import { FolderWithId } from '../page';

const style = {
    fontSize: '20px'
}

export default function DeckCard({ title, folder_id, deck_id, id, folder, setFolder }: { title: string, folder_id: number | null, deck_id: number, id: number, folder: FolderWithId, setFolder: Dispatch<SetStateAction<FolderWithId>>}) {
    const [ isChecked, setIsChecked ] = useState(false);
    const { addDeckToFolder, removeDeckFromFolder } = useSave();

    useEffect(() => {
        if (folder_id === id) {
            return setIsChecked(true);
        }
        return setIsChecked(false);
    }, [folder_id])

    const handleClick = async () => {
        if (!isChecked) {
            const response = await addDeckToFolder({ id, deck_id });
            if (response) {
                setIsChecked(true);
                const updatedFolder = {
                    ...folder,
                    decks: folder.decks.concat(response)
                }
                setFolder(updatedFolder);
                return;
            }
            console.log('Error adding deck to folder');
            return;
        } 
        
        const response = await removeDeckFromFolder({ deck_id });
        if (response) {
            setIsChecked(false);
            const updatedFolder = {
                ...folder,
                decks: folder.decks.filter(deck => deck.id !== response.id)
            }
            setFolder(updatedFolder);
            return;
        }
        console.log('Error removing deck from folder');
        return;
    }

    return (
        <div className='w-full bg-white flex justify-between items-center p-4'>
            <p className='text-lg text-slate-700 font-bold'>{title}</p>
            <button onClick={handleClick} className='text-lg text-slate-700 px-3 py-1 border border-slate-200 hover:text-[#3CCFCF]'>{isChecked ? <CheckIcon color='inherit' style={style}/> : <AddIcon color='inherit' style={style}/>}</button>
        </div>
    )
}