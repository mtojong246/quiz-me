export default function Card({ title, terms }: { title: string, terms: number | string }) {
    return (
        <div className=' h-[156px] bg-white rounded drop-shadow p-4 flex flex-row justify-between items-start'>
                <div>
                    <p className='font-bold text-reg text-slate-700 mb-[2px]'>{title}</p>
                    <p className='text-xsm text-slate-500'>{terms} terms</p>
                </div>
                <div>
                    <p></p>
                </div>
        </div>
    )
}