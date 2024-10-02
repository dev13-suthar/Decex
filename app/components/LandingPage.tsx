"use client"
import Link from "next/link"
import { Wallet, ArrowRightLeft, Shield, Coins } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const session = useSession();
    const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
     
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-blue-900 via-blue-800 to-emerald-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Your Secure Crypto Wallet
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-200 md:text-xl">
                  Hold, swap, and manage your crypto tokens with ease. Experience the future of digital finance with CryptoVault.
                </p>
              </div>
              <div className="space-x-4">
                <button onClick={()=>{
                    if(session.data?.user){
                        router.push("/dashboard")
                    }else{
                        router.push("/api/auth/signin")
                    }
                }} className="bg-emerald-500 text-white p-3 rounded-md hover:bg-emerald-600">{session.data?.user?"Go to DashBoard":"Get Started"}</button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-slate-900">What CryptoVault Offers</h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Wallet className="h-12 w-12 mb-4 text-emerald-600" />
                <h3 className="text-xl font-bold mb-2 text-slate-900">Secure Storage</h3>
                <p className="text-slate-600">Keep your crypto tokens safe with our state-of-the-art security measures.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <ArrowRightLeft className="h-12 w-12 mb-4 text-emerald-600" />
                <h3 className="text-xl font-bold mb-2 text-slate-900">Easy Swaps</h3>
                <p className="text-slate-600">Swap between different cryptocurrencies with just a few clicks.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="h-12 w-12 mb-4 text-emerald-600" />
                <h3 className="text-xl font-bold mb-2 text-slate-900">Enhanced Privacy</h3>
                <p className="text-slate-600">Your transactions and holdings are kept private and secure.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">Join the Crypto Revolution</h2>
                <p className="max-w-[600px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Be part of the future of finance. Sign up now and start managing your crypto portfolio with ease.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <button type="submit" className="bg-emerald-500 p-3 rounded-md text-white hover:bg-emerald-600">Sign Up</button>
                </form>
                <p className="text-xs text-slate-500">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2 hover:text-emerald-600" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-slate-200 bg-white">
        <p className="text-xs text-slate-500">© 2023 CryptoVault. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs text-slate-500 hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs text-slate-500 hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}