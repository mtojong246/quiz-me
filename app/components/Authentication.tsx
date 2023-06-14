import { Form } from './Form';

export default function Authentication({ toggleAuth }: { toggleAuth: () => void }) {
    return (
        <div className='absolute top-0 bottom-0 left-0 right-0 z-10 md:flex'>
            <div className='w-1/2 h-screen bg-cover bg-left hidden md:block p-9' style={{backgroundImage: 'url(https://images.pexels.com/photos/5256143/pexels-photo-5256143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'}}>
                <div className='flex flex-col justify-between align-start h-full'>
                    <p className='text-[#423ED8] text-xxl lg:text-[44px] lg:leading=[52px] font-bold max-w-[250px]'>Smash sets in your sweats.</p>
                    <p className="text-white text-xxl font-bold">Quiz<span className='text-[#4255FF]'>Me</span></p>
                </div>
            </div>
            <div className='md:w-1/2'>
                <Form toggleAuth={toggleAuth}/>
            </div>
        </div>
    )
}