export default function Footer() {
    return (
        <div className='bg-slate-50 w-full h-[64px] px-4 flex justify-between items-center border-t border-slate-100'>
            <div className='flex justify-center items-center'>
                <p className='text-slate-500 text-sm font-bold mr-4'>Privacy</p>
                <p className='text-slate-500 text-sm font-bold'>Terms</p>
            </div>
            <div>
                <p className='text-slate-500 text-sm font-bold'>English (USA)</p>
            </div>
        </div>
    )
}