import { FolderContext } from '../context/FolderContext';
import { AuthenticationContext } from '../context/AuthContext';
import { useContext } from 'react';
import Link from 'next/link';

export default function LibraryFolders() {
    const { data } = useContext(AuthenticationContext);
    const { folders } = useContext(FolderContext);

    return (
        <>
            {folders ? (
            <>
                {folders.map(folder => (
                    <Link href={`/folders/${folder.title.replace(/\s+/g, '-').toLowerCase()}`} className="cursor-pointer">
                        <div className='w-full p-4 hover:bg-gray-200' key={folder.id}>
                            <p className='text-lg text-slate-700 font-bold'>{folder.title}</p>
                            <p className='text-xsm text-slate-300'>{data ? data.username : ''}</p>
                        </div>
                    </Link>
                ))}
            </>
            ) : (
                <div className='w-full h-full flex flex-col justify-center items-center'>
                    <p>Your folders will appear here.</p>
                    <button>Create folder</button>
                </div>
            )}
        </>
    )
}