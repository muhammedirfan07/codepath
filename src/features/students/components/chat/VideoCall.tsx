import React, { useRef, useState } from 'react'

function otp() {
    const [otp, setOtp]=useState<string[]>(['','','','',''])
    const [subotp, SetSubOtp] = useState<string>('')
    const inputRefs = useRef<Array<HTMLInputElement | null>>([])
    const handleChange = (value: string, index: number): void=>{

           if (!/^\d?$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index]= value
        setOtp(newOtp)

        if(value && index<4){
            inputRefs.current[index+1]?.focus()
        }
    }

    const keydown  =(e:React.KeyboardEvent<HTMLInputElement> ,index:number)=>{
        if(e.key=== "Backspace"){
            if(!otp[index]  && index >0){
                inputRefs.current[index-1]?.focus()
            }
        }
    }

    const handleSubmit = () => {
        if(otp.every(value => value !== "")){
          const finalOtp = otp.join('')
     SetSubOtp(finalOtp)
    console.log('OTP:', finalOtp)
        }else{
            SetSubOtp(" fill all ")
        }

    
  }
  return (
    <div  className=' flex justify-center items-center w-full min-h-screen'>
         <div className=' flex flex-col p-6 rounded-xl border shadow-lg border-foreground'>
             <div className='bg-background w-70 p-2 grid  gap-2 grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] '>
               {
                otp.map((value,index)=>(
                    <input 
                    className=' p-2   bg-blue-400' 
                    type="text"
                    key={index}
                    ref={(element)=>{
                        inputRefs.current[index] =element
                    }}
                    value={value}
                    onChange={(e)=>handleChange(e.target.value, index)}
                    onKeyDown={(e)=>keydown(e,index)}
                    maxLength={1}
                    />         
                ))
               } 
             </div>
             <button onClick={handleSubmit} className=' rounded-3xl hover:shadow-xl bg-blue-800 text-white'> submit</button>

             <div className='mt-5 bg-amber-500 item-center p-5 '>
                  opt= {subotp}
             </div>
         </div>
    </div>
  )
}

export default otp