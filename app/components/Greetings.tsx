import Image from 'next/image'
import React from 'react'

const Greetings = ({name,profilePic}:{
    name:string,
    profilePic:string
}) => {
  return (
    <div className='p-1 flex items-center gap-2'>
        <div className='w-12 h-12 rounded-full'>
            <Image
            src={profilePic}
            alt='Nameee'
            height={300}
            width={200}
            className='rounded-full'
            />
        </div>
            <p className='text-xl'>Welcome Back,<span className='font-bold'>{name}</span></p>
    </div>
  )
}

export default Greetings