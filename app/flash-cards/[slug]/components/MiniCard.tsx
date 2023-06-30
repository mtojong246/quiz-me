export default function MiniCard({ term, definition }: { term: string, definition: string }) {
    return (
        <div className='w-full p-4 bg-white rounded drop-shadow'>
            <div className='flex flex-col justify-start items-start sm:flex-row gap-6 sm:gap-0'>
                <div className='w-full'><p className='text-reg text-slate-500'>{term}</p></div>
                <div className='w-full'><p className='text-reg text-slate-500'>{definition}</p></div>
            </div>
        </div>
    )
}