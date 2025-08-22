"use client"
import {useState, useEffect, useTransition, useRef} from 'react'
import { useSearchParams,useRouter } from 'next/navigation'
import axios from 'axios'
import useSWR from 'swr'
import { categorySections } from '@/lib/sectionData'
import { usePathname } from 'next/navigation'
import Navbar from "../components/Navbar";

const fetcher = url => axios.get(url).then(res=>res.data)

export default function Homepage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category  = searchParams.get('category') || 'home'
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const baseImageUrl = process.env.NEXT_PUBLIC_BASE_TMDB_URL
  const sectionData = categorySections[category] || categorySections['home']

    const [section,setSection] = useState([]) 
    const [currentSection,setCurrentSection] = useState(0)
    const [activeItem,setActiveItem] = useState(0)
  const containerRef = useRef(null) // เพื่อเช็ค container ว่ามี element เรียบร้อยแล้ว

  // const swrData = sectionData.map(section=>{
  //   const {data,error,isLoading} = useSWR(apiUrl + category + '/' + section.value, fetcher)
  //   // console.log("data",data)
  //   return {...section, data: data || [], loading: isLoading, error}
  // })



  useEffect(()=>{
    router.replace('/')
  },[])

    // fetch ข้อมุลทีละ section
  useEffect(()=>{
    const fetchSection = async () => {
      const result = []
      for(const sec of sectionData){
        try{
          const data = await fetcher(`${apiUrl}${category}/${sec.value}`)
          result.push({...sec,data})
          setSection([...result])
        }catch(error){
          result.push({...sec,data: [], error: error})
          setSection([...result])
        }
      }
    }
    fetchSection()
  },[category,apiUrl,sectionData])

    const activeSection = section[currentSection]

  useEffect(()=>{
    const handleScroll = () => {
      if(!containerRef.current) return // ถ้ายังไม่่มี element ไม่สามารถ scroll ได้
      const scrollY = window.scrollY // ตำแหน่ง scroll ปัจจุบัน
      const sectionHeight = window.innerHeight // ความสูง viewport
      const indexSection = Math.floor(scrollY / sectionHeight)
      if( indexSection >= 0 && indexSection < section.length){
        setCurrentSection(indexSection)
        setActiveItem(0) // reset active item when change section
      }
    }
    window.addEventListener('scroll',handleScroll)
    return () => window.removeEventListener('scroll',handleScroll)
  },[section])



  // สำหรับใช้ปุ่มเลื่อนซ้ายขวา
  useEffect(()=>{
    const handleKeyDown = (e) => {
      if(e.key === 'ArrowRight'){
        setActiveItem((prev)=> Math.min(prev+1,activeSection?.data.results.length -1))
      }else if(e.key === 'ArrowLeft'){
        setActiveItem((prev)=> Math.max(prev-1,0))
      }
    }
    window.addEventListener('keydown',handleKeyDown)
    return ()=> window.removeEventListener('keydown',handleKeyDown) // remove เพื่อป้องกันปัญหาการเรียกฟังก์ชันหลายครั้ง
  },[activeSection])

  if(section.length === 0) return <div>Loading</div>



  return (
    <div ref={containerRef}>
       <Navbar/>
      {/* active Item  */}
      <div>
        { activeSection?.data.results[activeItem] && (
            <div>
              <img
                src={`${baseImageUrl}${activeSection?.data.results[activeItem].backdrop_path}`}
                alt={activeSection?.data.results[activeItem].title}
              />
              <div>
                <h1>{activeSection?.data.results[activeItem].title}</h1>
                <p></p>
                <div>
                  <button></button>
                  <button></button>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
