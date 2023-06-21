export default function MiniCard() {
    return (
        <div className='w-full p-4 bg-white rounded drop-shadow'>
            <div className='flex flex-col justify-start items-start sm:flex-row gap-6'>
                <div className='w-full'><p className='text-reg text-slate-500'>Term</p></div>
                <div className='w-full'><p className='text-reg text-slate-500'>definition</p></div>
            </div>
        </div>
    )
}