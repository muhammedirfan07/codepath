import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Eorro404page() {
    const navigate = useNavigate()
  return (
    <div
    className=' h-screen w-full '
    >
        <div className=' w-full h-full flex  flex-col justify-center items-center'>
            <h1 className='text-9xl text-violet  '>404</h1>
            <p className='mb-2'> something wrong </p>
            <button
            onClick={()=>navigate('/')}
             className="inline-flex items-center rounded-full bg-[#7C3AED]  cursor-pointer px-8 py-3 text-base font-bold text-white shadow-xl shadow-violet-200/50 transition hover:bg-[#6D28D9]  group"
            > <ArrowLeft className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x group-hover:-translate-x-1" /> back Home</button>
        </div>
       
        </div>
  )
}

export default Eorro404page