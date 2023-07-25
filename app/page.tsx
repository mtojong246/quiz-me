'use client';
import Header from './components/Header'
import { useContext, useEffect } from 'react';
import { AuthenticationContext } from './context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isLoggedIn } = useContext(AuthenticationContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/latest');
    }
    return;
  }, [isLoggedIn])

  return (
    <div className='w-full bg-white min-h-screen'>
      <Header />
      <div className='w-full p-20'>
        <p className='max-w-screen-lg m-auto text-xl md:text-xxl text-slate-700 font-bold text-center'>90% of students who use QuizMe report receiving higher grades</p>
      </div>
    </div>
  )
}

