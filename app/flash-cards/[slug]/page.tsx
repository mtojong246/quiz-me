'use client';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import FilterIcon from '@mui/icons-material/Filter';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import MiniCard from './components/MiniCard';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function FlashCards({ params }: { params: { slug: string } }) {
    const separatedTitle = params.slug.replace(/-/g, ' ')

    return (
        <div className='bg-slate-50 p-4 sm:p-8'>
            <div className='max-w-[1200px] mx-auto mb-20'>
                <div className='w-full flex justify-between items-center mb-10'>
                    <p className='text-xl sm:text-xxl text-slate-700 font-bold'>{separatedTitle}</p>
                    <button className='px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-500 text-sm font-bold'>Share</button>
                </div>
                <div className='flex flex-col lg:flex-col-reverse mb-10'>
                    <div>
                        <div className='w-full h-[320px] sm:h-[420px] bg-white mb-5'>

                        </div>
                        <div className='w-full flex justify-center pb-5 items-center border-b-2 border-slate-300 mb-5 lg:mb-10'>
                            <div className='flex justify-center items-center gap-4'>
                                <button className='cursor-pointer'><ArrowCircleLeftIcon style={{fontSize: '40px', color: '#595959'}}/></button>
                                <p className='font-bold text-sm text-slate-500'>1/2</p>
                                <button className='cursor-pointer'><ArrowCircleRightIcon style={{fontSize: '40px', color: '#595959'}}/></button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full grid grid-cols-2 gap-4 mb-10 lg:mb-5'>
                        <button className='h-[60px] bg-white rounded-lg drop-shadow flex justify-center items-center cursor-pointer'>
                            <p className='font-bold text-sm text-slate-500'><FilterIcon className='mr-3' style={{fontSize: '24px', color: '#4255FF'}}/>Flashcards</p>
                        </button>
                        <button className='h-[60px] bg-white rounded-lg drop-shadow flex justify-center items-center cursor-pointer'>
                            <p className='font-bold text-sm text-slate-500'><RotateRightIcon className='mr-3' style={{fontSize: '24px', color: '#4255FF'}}/>Learn</p>
                        </button>
                    </div>
                </div>
                <div className='w-full flex justify-between items-center mb-10'>
                    <div></div>
                    <div>
                        <button className='border border-slate-300 rounded-lg bg-white p-2 cursor-pointer'><ModeEditIcon style={{fontSize: '24px', color: '#595959'}}/></button>
                    </div>
                </div>
                <div className='w-full mb-10'>
                    <p className='text-lg font-bold text-slate-700 mb-5'>Terms in this set ()</p>
                    <div className='flex flex-col justify-center items-center gap-4'>
                        <MiniCard />
                        <MiniCard />
                    </div>
                </div>
                <div className='w-full text-center'>
                    <button className='bg-[#4255FF] hover:bg-[#0017E6] text-white text-reg font-bold px-8 py-5 rounded-lg cursor-pointer'>Add or Remove Terms</button>
                </div>
            </div>
        </div>
    )
}
