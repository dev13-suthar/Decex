"use client"
import React from 'react'
import Greetings from './Greetings'
import { useSession } from 'next-auth/react'
import Assets from './Assets'

const ProfileCard = ({publicKey}:{
    publicKey:string
}) => {
    const session = useSession()
  return (
    <>
    <div className='max-w-2xl bg-zinc-700 rounded-md shadow w-full p-10'>
              <Greetings profilePic={session.data?.user?.image!!} name={session.data?.user?.name!!}/>
              <Assets publicKey={publicKey}/>
         </div>
    </>
  )
}

export default ProfileCard