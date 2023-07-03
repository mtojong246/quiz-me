'use client';
import CloseIcon from '@mui/icons-material/Close';
import { Fade } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { FolderWithId } from '../page';
import useSave from '@/hooks/useSave';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

export const EditFolder = ({ isEdit, toggleEdit, folder, setFolder }: { isEdit: boolean, toggleEdit: () => void, folder: FolderWithId, setFolder: Dispatch<SetStateAction<FolderWithId>> }) => {
    const { editFolder } = useSave();
    const [ isLoading, setIsLoading ] = useState(false);

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setFolder({
            ...folder,
            title: e.target.value,
        })
    }

    const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFolder({
            ...folder,
            description: e.target.value,
        })
    }

    const handleEdit = async () => {
        setIsLoading(true);
        const id = folder.id;
        const response = await editFolder({ id, folder });
        if (response) {
            toggleEdit();
            setIsLoading(false);
            return;
        }
        alert('Error editing folder');
        setIsLoading(false);
        return;
    }



    return (
        <Fade in={isEdit}>
            <div>
                <div className='fixed top-0 bottom-0 right-0 left-0 z-10 bg-slate-700 opacity-50 h-screen' onClick={toggleEdit}></div>
                <div className='fixed top-0 bottom-0 right-0 left-0 z-20 bg-white h-screen p-6 sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-85%] sm:h-fit sm:w-[640px] sm:rounded-xl'>
                    <div className='flex justify-between items-center mb-6'>
                        <p className='text-xl text-slate-700 font-bold'>Edit folder</p>
                        <CloseIcon style={{fontSize: '24px', color: '#595959'}} onClick={toggleEdit} className='cursor-pointer'/>
                    </div>
                    <input type='text' value={folder && folder.title} onChange={handleTitle} className='w-full bg-slate-100 p-4 text-reg rounded-lg mb-5' placeholder='Enter a title' />
                    <textarea value={folder && folder.description} onChange={handleDescription} className='h-[60px] p-4 text-reg w-full bg-slate-100 rounded-lg mb-16' placeholder='Enter a description (optional)' />
                    <div className='sm:pt-4 sm:border-t sm:border-slate-200 sm:flex sm:justify-end sm:items-center'>
                        <button onClick={handleEdit} className='w-full sm:w-auto text-center text-xsm font-bold p-3 text-white bg-[#4255FF] hover:bg-[#0017E6] disabled:bg-slate-200 rounded-lg cursor-pointer'>
                        {isLoading ? <CircularProgress color='inherit' /> : 'Done'}
                        </button>
                    </div>
                </div>
            </div>
        </Fade>
    )
}