'use client';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useContext, useState, useEffect, ChangeEvent } from 'react';
import { FolderContext } from '@/app/context/FolderContext';
import Link from 'next/link';
import { FolderType } from '@/app/context/FolderContext';

export default function UserFolders() {
    const { folders } = useContext(FolderContext);
    const [ filteredFolders, setFilteredFolders ] = useState<FolderType[]>(folders);
    const [ input, setInput ] = useState('');

    useEffect(() => {
        setFilteredFolders(folders);
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newInput = e.target.value;
        let newFolders = folders.filter(folder => folder.title.toLowerCase().includes(newInput.toLowerCase()));
        setInput(newInput);
        setFilteredFolders(newFolders)
    }

    return (
        <>
        {filteredFolders && (
            <>
                <div className='w-full text-right mb-6'>
                    <input onChange={handleChange} value={input} className='w-full max-w-[600px] p-4 bg-white rounded-lg mb-6' type='text' placeholder='Search your folders'/>
                </div>
                <div className='w-full flex flex-col gap-4 justify-center items-center pb-6'>
                {filteredFolders.map(folder => (
                    <Link href={`/folders/${folder.title.replace(/\s+/g, '-').toLowerCase()}`} className='w-full'>
                        <div className='w-full bg-white p-5' key={folder.id}>
                            <p className='text-sm font-bold text-slate-700 mb-2'>{folder.decks.length ? folder.decks.length : 0} sets</p>
                            <div className='flex justify-start items-center gap-3'>
                                <FolderOpenIcon style={{fontSize: '28px', color: '666666'}}/>
                                <p className='text-lg font-bold text-slate-700'>{folder.title}</p>
                            </div>
                        </div>
                    </Link>
                ))}
                </div>
            </>
        )}
        </>
    )
}