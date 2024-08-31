"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { signIn, signOut, useSession } from "next-auth/react";
// import LoginPage from "./Login";
export default function Home() {

  const {data : session} = useSession();
  console.log(session);


  return (
    <main className="w-full flex flex-col items-baseline  h-full max-h-screen  justify-normal p-10">
      <div className="self-end">
        <ModeToggle />
      </div>
      <div className="w-full flex  flex-col justify-center items-center space-y-6 ">
        <h1 className="font-bold text-5xl tracking-tighter">Welcom to you new app!</h1>
       
       
       {
        session?.user ? 
        <>
 <Button
        size='lg'
        onClick={() => {signOut();}}
        >
          
            Log out
          
        </Button>
        </> : 
        <>
          <Button
        size='lg'
        
        >
          <Link
          href={'/sing-in'}
          >
            Login          
          </Link>
        </Button>
        </>
       }
      

              
       
      </div>
      {/* <LoginPage /> */}
    </main>
   
  );
}
