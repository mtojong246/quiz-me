'use client';
import AddIcon from '@mui/icons-material/Add';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useState, useEffect, useContext } from 'react';
import { FolderWithDecks } from '@/app/context/FolderContext';
import { FolderContext } from '@/app/context/FolderContext';
import AddSet from './components/AddSet';
import Card from '@/app/latest/components/Card';
import FolderDropdown from './components/FolderDropdown';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

export interface FolderWithId extends FolderWithDecks {
    id: number;
}


export default function Folders({ params }: { params: { slug: string } }) {
    const separatedTitle = params.slug.replace(/-/g, ' ');
    const [ folder, setFolder ] = useState({} as FolderWithId);
    const { folders } = useContext(FolderContext)
    const [ checked, setChecked ] = useState(false);

    const toggleChecked = () => setChecked(!checked);

    useEffect(() => {
        const foundFolder = folders.find(f => f.title.toLowerCase().trim() === separatedTitle.toLowerCase().trim());
        if (foundFolder) {
            const { title, description, decks, id } = foundFolder;
            setFolder({ title, description: description as string, decks, id })
        }
    }, [folders])



    return (
        <>
            <div className='w-full p-5 sm:p-10 bg-slate-50 min-h-screen'>
                <div className='max-w-[1200px] mx-auto'>
                {folder ? (
                    <>
                        <p className='text-xsm text-slate-700 sm:text-sm font-bold mb-4'>{folder.decks ? folder.decks.length : 0} {folder.decks && folder.decks.length === 1 ? 'set' : 'sets'}</p>
                        <div className='flex justify-start items-center gap-3'>
                            <FolderOpenIcon style={{fontSize: '42px', color: '666666'}} className='hidden sm:block'/>
                            <p className="text-[26px] text-slate-700 sm:text-[38px] font-bold">{folder.title}</p>
                        </div>
                        <p className='text-reg text-slate-700 mb-4'>{folder.description ? folder.description : ''}</p>
                        <div className='flex justify-start items-center gap-3 mb-5'>
                            <button onClick={toggleChecked} className='rounded-full bg-white border border-slate-300 p-2'><AddIcon style={{fontSize: '24px', color: '#666666'}}/></button>
                            <button className='rounded-full bg-white border border-slate-300 p-2'><IosShareIcon style={{fontSize: '24px', color: '#666666'}}/></button>
                            <FolderDropdown folder={folder} setFolder={setFolder}/>
                        </div>
                        {folder.decks && folder.decks.length ? (
                            <div className='w-full grid grid-cols-1 sm:grid-cols-2 mt-20 gap-4'>
                            {folder.decks.map((deck, i) => (
                                <Card key={i} title={deck.title} terms={`${deck.cards ? deck.cards.length : 0}`}/>
                            ))}
                            </div>
                        ) : (
                            <div className='w-full text-center p-8'>
                                <p className="text-[26px] text-slate-700 sm:text-[30px] font-bold mb-2">This folder has no sets yet</p>
                                <p className='text-sm sm:text-reg mb-5 text-slate-700'>Organize all your study sets with folders</p>
                                <button onClick={toggleChecked} className='text-xsm sm:text-sm text-white font-bold px-5 py-3 sm:px-6 sm:py-4 rounded-lg bg-[#3CCFCF] cursor-pointer'>Add a set</button>
                            </div>
                        )}
                    </>
                ) : (
                    <h1>Loading...</h1>
                )}
                </div>
            </div>
            <AddSet checked={checked} toggleChecked={toggleChecked} id={folder.id} folder={folder} setFolder={setFolder}/>
        </>
    )
}