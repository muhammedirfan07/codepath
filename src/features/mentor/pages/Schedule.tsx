import React, { useState } from 'react'
import MentorSidebar from '../components/MentorSidebar'
import MentorHeader from '../components/MentorHeader'
import { Trash } from 'lucide-react'
 Trash
function Schedule() {
    const [mobileNavOpen,setMobileNavOpen] =useState(false)
  return (
   <div className="flex min-h-screen w-full bg-background">
      <MentorSidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <MentorHeader onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-x-hidden bg-background p-3 md:p-5">
          <div className="mx-auto max-w-7xl">
            <div className='space-y-6'>
              <div className=' bg-card text-card-foreground rounded-2xl border-0 gradient-warm-soft p-5 shadow-sm'>
                <div className=' grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end'> 
                   <div className='flex flex-col'>
                      <label className='font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xs' htmlFor=""> Days</label>
                       <select className='mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm' name="" id="">
                        <option value="Sun">Sun</option>
                        <option value="Mon">Mon</option>
                        <option value="Tue">Tue</option>
                        <option value="Wen">Wen</option>
                        <option value="Thu">Thu</option>
                        <option value="Fri">Fri</option>
                        <option value="Sat">Sat</option>
                       </select>
                   </div>
                   <div className='flex flex-col '>
                      <label className='font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xs' htmlFor=""> Start</label>
                      <input className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' type="time" />
                   </div>
                   <div className='flex flex-col'>
                      <label className='font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xs' htmlFor=""> End</label>
                      <input className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' type="time" />
                   </div>
                   <button className='bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed'>
                    add slot
                   </button>
                </div>
              </div>
  
              <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3'>
                 <div className='rounded-xl border bg-card text-card-foreground shadow p-4'>
                  <div className='mb-2 font-medium'>sun</div>
                  <div className='space-y-2' >
                    <div className='flex items-center justify-between rounded-md bg-secondary px-3 py-2 text-sm'>
                        <span className='text-muted-foreground '>10:00 -11:00</span>
                        <button className='text-muted-foreground hover:text-destructive cursor-pointer'><Trash className='h-4 w-4'/></button>
                    </div>
                    <div className='flex items-center justify-between rounded-md bg-secondary px-3 py-2 text-sm'>
                        <span className='text-muted-foreground '>10:00 -11:00</span>
                        <button className='text-muted-foreground hover:text-destructive cursor-pointer'><Trash className='h-4 w-4'/></button>
                    </div>
                  </div>
                 </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Schedule