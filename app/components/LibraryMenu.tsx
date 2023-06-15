export const LibraryMenu = () => {
    return (
        <div className='w-[400px] h-fit bg-white rounded-lg border border-slate-200 drop-shadow p-4 absolute left-[120px] top-[70px] z-10 hidden md:block'>
            <div className='flex justify-start items-center gap-5'>
                <button className='pb-2 border-b-2 border-[#4255FF] cursor-pointer'><p className='text-sm text-slate-500 font-bold cursor-pointer'>Study sets</p></button>
                <button className='pb-2 border-b-2 border-[#4255FF] cursor-pointer'><p className='text-sm text-slate-500 font-bold cursor-pointer'>Folders</p></button>
            </div>
        </div>
    )
}