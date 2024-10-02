"use client"
import React from 'react'
import { ContainerScroll } from './ui/ContainerScroll'
import Image from 'next/image'
import { SecondaryButton } from './Button'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const router = useRouter();
    const session = useSession();
  return (
    <div className='p-3'>
        <header className='flex flex-col items-center justify-center gap-3 pt-14'>
            <p className='text-[3.8rem]'>The Crypto of Tomorrow,<span className='font-bold text-yellow-500'>Today</span></p>
            <p className='text-xl'>Create a frictionless wallet with just a Google Account</p>
            {session.data?.user?(
                <SecondaryButton onClick={()=>router.push("/dashboard")}  className='mt-5'>Go to Dashboard</SecondaryButton>
            ):(
                <SecondaryButton onClick={()=>signIn()}  className='mt-5'>Sign up with Google</SecondaryButton>
            )}
        </header>
        <div className='flex items-center justify-center flex-col gap-1'>
            <ContainerScroll titleComponent={
                <>
                 <h1 className="text-4xl font-semibold text-black dark:text-white">
                 Trade Noww<br /></h1>
                </>
            }>
                <Image
                src={'https://images.pexels.com/photos/14354107/pexels-photo-14354107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                alt="hero"
                height={720}
                width={1400}
                className="mx-auto rounded-2xl object-cover h-full object-left-top"
                draggable={false}
                />
            </ContainerScroll>
        </div>
    </div>
  )
}

export default Hero