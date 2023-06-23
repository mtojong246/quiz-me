'use client';
import { DeckType } from '@/app/create-set/page';
import Carousel from './Carousel';
import CloseIcon from '@mui/icons-material/Close';
import FilterIcon from '@mui/icons-material/Filter';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import Learn from './Learn';


export default function Fullscreen({ expand, toggleExpand, deck, fullscreen }: { expand: boolean, toggleExpand: () => void, deck: DeckType, fullscreen: string }) {
    

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 h-screen'>
            <div className='w-full bg-white p-4 flex justify-between items-center'>
                <p className='font-bold text-lg text-slate-500'>
                    {fullscreen === 'flashcards' ? <FilterIcon className='mr-3' style={{fontSize: '24px', color: '#4255FF'}}/> : <RotateRightIcon className='mr-3' style={{fontSize: '24px', color: '#4255FF'}}/>}
                    {fullscreen === 'flashcards' ? 'Flashcards' : 'Learn'}
                </p>
                <p className='font-bold text-lg text-slate-500 mr-24'>{deck.title}</p>
                <button onClick={toggleExpand} className='border border-slate-500 rounded-lg px-2 py-[6px] cursor-pointer'><CloseIcon style={{fontSize: '20px', color: '#595959'}} /></button>
            </div>
            <div className='px-4 py-10 bg-slate-50 w-full h-full'>
                <div className='w-full max-w-[1200px] mx-auto'>
                {fullscreen === 'flashcards' ? (
                    <Carousel deck={deck} expand={expand}/>
                ) : (
                    <Learn deck={deck}/>
                )}
                </div>
            </div>
        </div>
    )
}