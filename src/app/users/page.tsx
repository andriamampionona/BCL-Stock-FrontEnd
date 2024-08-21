"use client";

 
import { Button } from "@/components/ui/button"


import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function Dashboard() {

  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/sing-in')
    }
  }, [status, router])

  if (status === "loading") {
    return <div>Loading...</div>
  }

   if (status === "authenticated") {
  return (
   
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          Users
        </main>
  )
}
}
