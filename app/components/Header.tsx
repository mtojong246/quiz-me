export default function Header() {
    return (
        <div className="bg-auto md:bg-cover bg-top w-full h-[720px] p-7 md:px-7 md:py-20 lg:p-20" style={{backgroundImage: 'url(https://pronto.io/wp-content/uploads/2021/07/EDU-_-Student-Attention-Span-and-How-to-Capture-and-Maintain-It.jpg)'}}>
            <div className='h-full flex flex-col justify-start md:justify-center items-start'>
                <div className='lg:max-w-xl max-w-md m-8 md:m-11'>
                    <p className='text-xxl md:text-[44px] text-white font-bold mb-4'>The best digital flashcards and study tools</p>
                    <p className='text-reg lg:text-lg text-white font-reg'>Join over 60 million students using QuizMe's science-backed flashcards, practice tests and expert solutions to improve their grades and reach their goals.</p>
                </div>
                <div className='mx-8 mb-8 md:mx-11 md:mb-11'>
                    <button className='px-6 py-3 text-white font-bold bg-[#4255FF] hover:bg-[#0017E6] rounded-lg cursor-pointer'>Sign up for free</button>
                </div>
            </div>
        </div>
    )
}