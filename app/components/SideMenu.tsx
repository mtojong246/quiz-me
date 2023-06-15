'use client';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FolderIcon from '@mui/icons-material/Folder';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useState } from 'react';

export const SideMenu = ({ toggleMenu }: { toggleMenu: () => void }) => {
    const [ library, setLibrary ] = useState(false);
    const [ create, setCreate ] = useState(false);

    const toggleLibrary = () => setLibrary(!library);
    const toggleCreate = () => setCreate(!create);

    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 bg-white p-4 z-10 block md:hidden'>
            <div className='flex justify-end items-center'>
                <CloseIcon style={{fontSize: '40px', color: '#595959'}} onClick={() => {toggleMenu(); setCreate(false); setLibrary(false)}}/>
            </div>
            <div className='flex justify-start items-center my-5'>
                <p className='text-xl text-[#4255FF] font-bold mr-5'>Q</p>
                <p className='text-lg text-slate-700 font-bold'>Home</p>
            </div>
            <div className='flex justify-start items-center my-5'>
                <FolderIcon style={{fontSize: '24px', color: '#e462e4'}} className='mr-5'/>
                <button onClick={toggleLibrary}>
                    <div className='flex justify-start items-center'>
                        <p className='text-lg text-slate-700 font-bold mr-2'>Your library</p>
                        <KeyboardArrowDownIcon style={{fontSize: '20px', color: '#262626'}}/>
                    </div>
                </button>
            </div>
            {library ? (
            <div className='my-5 pl-5'>
                <p className='text-lg text-slate-500 font-bold my-5'>Study sets</p>
                <p className='text-lg text-slate-500 font-bold my-5'>Folders</p>
            </div>
            ) : null}
            <div className='flex justify-start items-center my-5'>
                <BorderColorIcon style={{fontSize: '24px', color: '#ffcc66'}} className='mr-5'/>
                <button onClick={toggleCreate}>
                    <div className='flex justify-start items-center'>
                        <p className='text-lg text-slate-700 font-bold mr-2'>Create</p>
                        <KeyboardArrowDownIcon style={{fontSize: '20px', color: '#262626'}}/>
                    </div>
                </button>
            </div>
            {create ? (
            <div className='my-5 pl-5'>
                <p className='text-lg text-slate-500 font-bold my-5'>Study set</p>
                <p className='text-lg text-slate-500 font-bold my-5'>Folder</p>
            </div>
            ) : null}
            <div className='my-8 py-8 border-t border-slate-150'>
                <button className='w-full py-3 px-4 text-center text-sm text-slate-500 font-bold rounded-lg border border-slate-300 bg-white'>Log out</button>
            </div>
        </div>
    )
}