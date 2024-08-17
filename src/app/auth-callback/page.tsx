"use client"

import { useQuery } from "@tanstack/react-query"
import {useState,useEffect} from "react"
import { getAuthStatus } from "./actions"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const Page = () => {
    const [configId, setConfigId] = useState<string|null>(null)
    const router = useRouter()
    useEffect(()=>{
        const configurationId = localStorage.getItem("configurationId")
        if(configurationId) setConfigId(configurationId)
    }, [])
    
    const { data} = useQuery({
        queryKey: ['auth-callback'],
        queryFn: async () => await getAuthStatus(),
        retry:true,
        retryDelay:500,
    })
     console.log("line number 23",configId);
    if (data?.success) {
        console.log("line number 25", configId);
        if (configId) {
            localStorage.removeItem("configurationId")
            router.push(`/configure/preview?id=${configId}`)
        }
        else {
            router.push('/')
        }
    }
    return (
        <div className="w-full mt-24 flex justify-center">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-4 w-8 animate-spin text-zinc-500 "/>
                    <h3 className="font-semibold text-xl">Loggind you in....</h3>
                    <p>You will be redirected automatically</p>
            </div>
            
            </div>
        )

}

export default Page