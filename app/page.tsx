import Image from 'next/image'
import Header from './components/Header'

export default function Home() {
  return (
    <>
      <Header />
      <div className='w-full p-20'>
        <p className='max-w-screen-lg m-auto text-xl md:text-xxl text-slate-700 font-bold text-center'>90% of students who use QuizMe report receiving higher grades</p>
      </div>
    </>
  )
}
