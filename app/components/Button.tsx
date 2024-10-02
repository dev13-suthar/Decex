"use client"

import React from "react"

const PrimaryButton = ({children,onClick}:{
    children:React.ReactNode,
    onClick:()=>void
}) => {
  return (
    <>
    <button className='bg-zinc-700 p-2 rounded-md' onClick={onClick}>
        {children}
    </button>
    </>
  )
}
export default PrimaryButton

export const SecondaryButton = ({children,onClick,className}:{
  children:React.ReactNode,
  onClick:()=>void,
  className?:string
})=>{
  return(
    <button onClick={onClick}
    className={`${className} text-zinc-700 bg-yellow-200 p-2 rounded-md`}
    >
      {children}
    </button>
  )
}

export const TabsButton = ({children,onClick}:{
  children:React.ReactNode,
  onClick:()=>void,
})=>{
  return(
    <>
    <button onClick={onClick} className='px-10 py-2 bg-blue-400 hover:bg-blue-400 transition-all duration-400 font-bold rounded-lg'>
                  {children}
    </button>
    </>
  )
 
}