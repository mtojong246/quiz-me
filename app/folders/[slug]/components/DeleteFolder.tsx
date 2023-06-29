'use client';
import { Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { FolderWithId } from '../page';
import useDelete from '@/hooks/useDelete';

export default function DeleteFolder({ isDelete, toggleDelete, folder }: { isDelete: boolean, toggleDelete: () => void, folder: FolderWithId }) {
    const router = useRouter();
    const { deleteFolder } = useDelete();

    const handleDelete = async () => {
        const response = await deleteFolder({ id: folder.id });
        if (response) {
            console.log(response);
            return router.push('/latest');
        }
        console.log('error deleting folder');
        return;
    }

    return (
        <Fade in={isDelete}>
            <div>
                <div className='fixed top-0 bottom-0 right-0 left-0 z-10 bg-slate-700 opacity-50 h-screen' onClick={toggleDelete}></div>
                <div className='fixed top-0 bottom-0 right-0 left-0 z-20 bg-slate-50 h-screen sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-65%] sm:h-fit sm:w-[600px] sm:rounded-xl'>
                    <div className='w-full p-4 sm:p-8 flex justify-between items-center bg-[#4255FF]'>
                        <p className='text-white text-[26px] sm:text-[30px] font-bold'>Delete folder</p>
                        <button onClick={toggleDelete}><CloseIcon style={{fontSize: '24px', color: 'white'}}/></button>
                    </div>
                    <div className='w-full p-4 sm:p-8 bg-slate-50'>
                        <p className='mb-6 text-[26px] sm:text-[30px] text-slate-700 font-bold'>{folder && folder.title}</p>
                        <p className='text-reg text-slate-700 mb-8'>Deleting a folder is a PERMANENT action. This cannot be undone. Are you sure you want to delete this folder? The sets in this folder will not be deleted.</p>
                        <div className='flex flex-col justify-center items-center sm:flex-row sm:justify-between gap-4'>
                            <button onClick={toggleDelete} className='w-full sm:w-[250px] py-5 bg-[#303545] text-white font-bold rounded'>Cancel</button>
                            <button onClick={handleDelete} className='w-full sm:w-[250px] py-5 bg-[#FF725B] text-white font-bold rounded'>Delete folder</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}