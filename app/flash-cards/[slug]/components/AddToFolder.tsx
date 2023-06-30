'use client';
import { Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FolderContext } from '@/app/context/FolderContext';
import { useContext, useState } from 'react';
import { DeckType } from '@/app/context/DeckContext';
import FolderCard from './FolderCard';
import { CreateFolder } from '@/app/components/CreateFolder';

export default function AddToFolder({ isAdd, toggleAdd, deck }: { isAdd: boolean, toggleAdd: () => void, deck: DeckType }) {
    const { folders } = useContext(FolderContext)
    const [ checked, setChecked ] = useState(false);

    const toggleChecked = () => setChecked(!checked);

    return (
        <>
        <Fade in={isAdd}>
            <div>
                <div className='fixed top-0 bottom-0 right-0 left-0 z-10 bg-slate-700 opacity-50 h-screen' onClick={toggleAdd}></div>
                <div className='fixed top-0 bottom-0 right-0 left-0 z-20 bg-slate-50 h-screen sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-65%] sm:h-fit sm:w-[600px] sm:rounded-xl'>
                    <div className='w-full p-4 sm:p-8 flex justify-between items-center bg-[#4255FF]'>
                        <p className='text-white text-[26px] sm:text-[30px] font-bold'>Add to a folder</p>
                        <button onClick={toggleAdd}><CloseIcon style={{fontSize: '24px', color: 'white'}}/></button>
                    </div>
                    <div className='w-full p-4 bg-slate-50 max-h-[90vh] overflow-y-scroll sm:max-h-[400px]'>
                        <button onClick={() => {toggleAdd(); toggleChecked()}} className='w-full p-6 bg-white text-center text-slate-700 font-bold text-xsm sm:text-reg mb-10 hover:text-[#3CCFCF]'>
                            + CREATE NEW FOLDER
                        </button>
                        <div className='w-full flex flex-col justify-start items-center gap-5 mb-5 sm:mb-0'>
                            {folders && folders.map(folder => (
                                <FolderCard key={folder.id} deck={deck} folder={folder}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
        <CreateFolder checked={checked} toggleFolder={toggleChecked}/>
        </>
    )
}