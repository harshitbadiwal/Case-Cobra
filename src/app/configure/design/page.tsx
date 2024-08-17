import { db } from "@/db"
import { notFound } from "next/navigation"
import DesignConfigurator from "./DesignConfigurator"


interface PageProps {
    searchParams:{
        [key:string]:string | string[] | undefined
    }
}

const page = async({searchParams}: PageProps) => {
    const {id} = searchParams

    if(!id || typeof id !== "string"){
        return notFound()
    }
    const configration = await db.configuration.findUnique({
        where:{id},
    })

    if(!configration){
        notFound()
    }
const {imageUrl, width,height} = configration
    return <DesignConfigurator configId={configration.id} imageDimensions={{ width, height }} imageUrl={imageUrl} />
}

export default page
