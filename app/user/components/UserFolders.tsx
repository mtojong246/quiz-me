'use client';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useContext } from 'react';
import { FolderContext } from '@/app/context/FolderContext';

export default function UserFolders() {
    const { folders } = useContext(FolderContext)

    return (
        <>
        {folders && (
            <>
                <div className='w-full text-right mb-6'>
                    <input className='w-full max-w-[600px] p-4 bg-white rounded-lg mb-6' type='text' placeholder='Search your folders'/>
                </div>
                <div className='w-full flex flex-col gap-4 justify-center items-center pb-6'>
                {folders.map(folder => (
                    <div className='w-full bg-white p-5' key={folder.id}>
                        <p className='text-sm font-bold text-slate-700 mb-2'>{folder.decks.length ? folder.decks.length : 0} sets</p>
                        <div className='flex justify-start items-center gap-3'>
                            <FolderOpenIcon style={{fontSize: '28px', color: '666666'}}/>
                            <p className='text-lg font-bold text-slate-700'>{folder.title}</p>
                        </div>
                    </div>
                ))}
                </div>
            </>
        )}
        </>
    )
}