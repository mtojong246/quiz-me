import { FolderContext } from '../context/FolderContext';
import { AuthenticationContext } from '../context/AuthContext';
import { useContext } from 'react';
import Link from 'next/link';

export default function LibraryFolders({ toggleLibrary }: { toggleLibrary: () => void }) {
    const { data } = useContext(AuthenticationContext);
    const { folders, toggleFolder } = useContext(FolderContext);

    return (
        <>
            {folders && folders.length ? (
            <>
                {folders.map(folder => (
                    <Link href={`/folders/${folder.title.replace(/\s+/g, '-').toLowerCase()}`} className="cursor-pointer">
                        <div className='w-full p-4 hover:bg-gray-200' key={folder.id} onClick={toggleLibrary}>
                            <p className='text-lg text-slate-700 font-bold'>{folder.title}</p>
                            <p className='text-xsm text-slate-300'>{data ? data.username : ''}</p>
                        </div>
                    </Link>
                ))}
            </>
            ) : (
                <div className='w-full h-full flex flex-col justify-center items-center py-4'>
                    <p className='text-slate-500 font-bold'>Your folders will appear here.</p>
                    <button onClick={() => {toggleLibrary(); toggleFolder()}} className='bg-[#3CCFCF] text-white text-sm font-bold rounded-lg px-5 py-2 mt-4'>Create folder</button>
                </div>
            )}
        </>
    )
}