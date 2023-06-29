export default function UserDecks() {
    return (
        <>
            <div className='w-full text-right mb-6'>
                <input className='w-full max-w-[600px] p-4 bg-white rounded-lg mb-6' type='text' placeholder='Search your sets'/>
            </div>
            <div className='w-full flex flex-col gap-4 justify-center items-center mb-6'>
                <div className='w-full bg-white p-5'>
                    <p className='text-sm font-bold text-slate-700 mb-2'>0 terms</p>
                    <p className='text-lg font-bold text-slate-700'>Deck</p>
                </div>
            </div>
        </>
    )
}