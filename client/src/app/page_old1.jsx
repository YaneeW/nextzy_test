"use client"
import Navbar from "../components/Navbar";
import Section from '../components/Section'
import { categorySections } from '@/lib/sectionData'
import { useSearchParams,useRouter } from 'next/navigation'
import { useEffect} from 'react'


export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const category  = searchParams.get('category') || 'home'
    const sectionData = categorySections[category] || categorySections['home']


  useEffect(()=>{
    router.replace('/')
  },[])

    return (
        <div className=" relative h-full w-full min-h-screen">
            <Navbar />
            { sectionData.map(sec=>(
            
                 <Section key={sec.value} title={sec.name} url={`${category}/${sec.value}`}></Section>
            ))}
            {/* <Section key={sectionData[0].value} title={sectionData[0].name} url={`${category}/${sectionData[0].value}`}/>
            <Section key={sectionData[0].value} title={sectionData[0].name} url={`${category}/${sectionData[0].value}`}/>
            <Section key={sectionData[0].value} title={sectionData[0].name} url={`${category}/${sectionData[0].value}`}/>
            <Section key={sectionData[0].value} title={sectionData[0].name} url={`${category}/${sectionData[0].value}`}/> */}
        </div>
    )
}