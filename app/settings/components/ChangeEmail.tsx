export default function ChangeEmail() {
    return (
        <div className='w-full p-4 rounded-lg bg-white p-4 text-left'>
            <p className='font-bold text-slate-700 text-med mb-1'>Update your email</p>
            <input type='text' className='border-b-2 border-slate-700 w-full p-2 mb-1'/><label className='text-[10px] text-slate-400 mb-3 block'>NEW EMAIL</label>
            <input type='password' className='border-b-2 border-slate-700 w-full p-2 mb-1'/><label className='text-[10px] text-slate-400 block mb-8'>QUIZME PASSWORD</label>
            <button className='bg-[#3CCFCF] text-sm text-white font-bold py-2 px-5 rounded'>Submit</button>
        </div>
    )
}