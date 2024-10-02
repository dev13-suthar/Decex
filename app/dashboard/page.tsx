import React from 'react'
import { getServerSession } from 'next-auth'
import ProfileCard from '../components/ProfileCard';
import prisma from "@/app/db/index"
import { authConfig } from '../lib/authoptions';
import { redirect } from 'next/navigation';


async function getBalance(){
  const session = await getServerSession(authConfig);
  const userWallet = await prisma.solwallet.findFirst({
     where:{
        userId:session?.user.uid
     },
     select:{
      publicKey:true
     }
  });

  if(!userWallet){
      return {
        error:"No Solana Wallet found associated with your UserId"
      }
  }
  return {error:null,userWallet};

}

const Dashboard = async() => {
  const session = await getServerSession(authConfig);
  if(!session){
    return redirect("/api/auth/signin")
  }
  const userWallet = await getBalance(); 
  if(userWallet.error || !userWallet.userWallet?.publicKey){
      return <>
        <div>No Solana Wallet Found</div>
      </>
  }
  return (
    <div className='mt-14 p-2 flex justify-center'>
         <ProfileCard publicKey={userWallet.userWallet.publicKey} />
    </div>
  )
}

export default Dashboard