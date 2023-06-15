import { Card } from './components/Card';
import { initialSet } from '@/data/mockData';

export default function CreateSet() {
    return (
        <div className='bg-slate-50 p-4 sm:p-8'>
            <div className='max-w-[1200px] mx-auto mb-20'>
                <div className='flex justify-between items-center mb-20'>
                    <p className='text-med font-bold text-slate-700 sm:text-[30px]'>Create a new set</p>
                    <button className='bg-[#4255FF] hover:bg-[#0017E6] px-4 sm:px-8 py-2 sm:py-4 rounded-lg cursor-pointer text-white text-xsm sm:text-sm font-bold'>Create</button>
                </div>
                <div className='flex flex-col gap-10'>
                    <input type="text" className='w-full text-slate-700 text-reg rounded-lg bg-white p-4' placeholder='Enter a title like "Biology - Chapter 22: Evolution"'/>
                    <textarea className='w-full text-slate-700 text-sm rounded-lg bg-white p-4 h-[120px]' placeholder='Add description...' />
                </div>
            </div>
            <div className='max-w-[1200px] mx-auto flex flex-col justify-center items-center gap-5'>
            {initialSet.map(set => (
                <Card key={set.id} num={set.id}/>
            ))}
            </div>
            <div className='max-w-[1200px] mx-auto my-5'>
                <div className='bg-white rounded-lg w-full p-6 text-center cursor-pointer group'>
                    <p className='text-sm text-slate-500 font-bold group-hover:text-[#3CCFCF]'>+ ADD CARD</p>
                </div>
            </div>
            <div className='max-w-[1200px] mx-auto flex justify-end items-center'>
                <button className='bg-[#4255FF] hover:bg-[#0017E6] px-8 py-5 rounded-lg cursor-pointer text-white font-bold'>Create</button>
            </div>
        </div>
    )
}