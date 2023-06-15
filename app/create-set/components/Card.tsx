'use client';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const Card = ({ num }: { num: number }) => {
    return (
        <div className='bg-white rounded-lg w-full'>
            <div className='flex justify-between items-center py-4 px-6'>
                <p className='text-reg text-slate-500 font-bold'>{num}</p>
                <DeleteOutlineIcon style={{fontSize: '20px', color: '#595959'}} className='cursor-pointer'/>
            </div>
            <div className='p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-center sm:justify-evenly items-center gap-4'>
                <div className='w-full sm:pr-5'>
                    <input type='text' className='w-full text-slate-700 text-reg py-1 border-b border-slate-400' placeholder='Enter term'/>
                    <p className='text-xsm text-slate-500 font-bold mt-1'>TERM</p>
                </div>
                <div className='w-full sm:pl-5'>
                    <input type='text' className='w-full text-slate-700 text-reg py-1 border-b border-slate-400' placeholder='Enter definition'/>
                    <p className='text-xsm text-slate-500 font-bold mt-1'>DEFINITION</p>
                </div>
            </div>
            <div className='flex justify-end items-center p-4 mt-5'>
                <MoreVertIcon style={{fontSize: '20px', color: '#595959'}} className='cursor-pointer'/>
            </div>
        </div>
    )
}