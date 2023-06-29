'use client';
import { useState, useEffect, MouseEvent } from 'react';
import LibraryDecks from './LibraryDecks';
import LibraryFolders from './LibraryFolders';
import { useRouter } from 'next/navigation';

export const LibraryMenu = ({ toggleLibrary }: { toggleLibrary: () => void }) => {
    const [ isActive, setIsActive ] = useState('');
    const router = useRouter();

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if ((e.currentTarget as HTMLButtonElement).value === 'study-sets') {
            setIsActive('study-sets');
        } else if ((e.currentTarget as HTMLButtonElement).value === 'folders') {
            setIsActive('folders');
        }
        return;
    }

    useEffect(() => {
        setIsActive('study-sets');
    }, []);

    const viewAll = () => {
        router.push('/user')
        toggleLibrary();
    }


    return (
        <div className='w-[400px] h-fit bg-white rounded-lg border border-slate-200 drop-shadow py-4 absolute left-[120px] top-[70px] z-10 hidden md:block'>
            <div className='flex justify-start items-center gap-5 px-4 pb-2 border-b-2 border-slate-300'>
                <button className='pb-2 cursor-pointer' onClick={handleClick} value='study-sets'><p className={`text-sm ${isActive === 'study-sets' ?'text-[#4255FF]':'text-slate-500'} font-bold cursor-pointer`}>Study sets</p></button>
                <button className='pb-2 cursor-pointer' onClick={handleClick} value='folders'><p className={`text-sm ${isActive === 'folders' ?'text-[#4255FF]':'text-slate-500'} font-bold cursor-pointer`}>Folders</p></button>
            </div>
            <div className='max-h-[300px] overflow-y-scroll'>
            {isActive === 'study-sets' ? (
                <LibraryDecks toggleLibrary={toggleLibrary} />
            ) : (
                <LibraryFolders toggleLibrary={toggleLibrary} />
            )}
            </div>
            <div className='px-4'>
                <button onClick={() => viewAll()} className='text-reg text-[#4255FF] hover:text-[#0017E6] font-bold cursor-pointer'>View all sets</button>
            </div>
        </div>
    )
}
