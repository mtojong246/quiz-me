'use client';
import { useState } from "react"

export default function DeleteAccount() {
    const [ checked, setChecked ] = useState(false);

    const togglePopup = () => setChecked(!checked);

    return (
        <>
            <div className='w-full p-4 rounded-lg bg-white p-4 text-left'>
                <p className='font-bold text-slate-700 text-med mb-4'>Permanently delete username</p>
                <p className='text-sm text-slate-700 mb-6'>Be careful - this will delete all your data and cannot be undone.</p>
                <button className='bg-[#FF725B] text-sm text-white font-bold py-2 px-5 rounded'>Delete Account</button>
            </div>
        </>
    )
}