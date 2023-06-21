import Recent from "./components/Recent"

export default function Latest() {
    return (
        <div className='bg-slate-50 px-4 py-8 h-screen'>
            <div className='max-w-[1200px] m-auto mb-16'>
                <p className='text-reg font-bold text-slate-700 mb-5'>Achievements</p>
                <div className='p-8 rounded drop-shadow bg-white text-center flex flex-col gap-4 md:flex-row-reverse bg-[#FFF2E6]'>
                    <img src='https://quizlet.com/static/achievements/streak-Week.svg' className='w-20 h-20 sm:w-32 sm:h-32 m-auto md:mr-0'/>
                    <div className='flex flex-col justify-center items-center md:items-start'>
                        <p className='text-lg text-slate-700 font-bold mb-2'>Start a study streak</p>
                        <p className='text-reg text-slate-700 font-light max-w-[520px] m-auto md:m-0 md:text-left'>Streaks help you stay motivated and reach your goals. Start your first streak today!</p>
                    </div>
                </div>
            </div>
            <div className='max-w-[1200px] m-auto'>
                <p className='text-reg font-bold text-slate-700 mb-5'>Recent</p>
                <Recent />
            </div>
        </div>
    )
}