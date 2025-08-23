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

  const swrData = sectionData.map(section=>{
    const {data,error,isLoading} = useSWR(apiUrl + category + '/' + section.value, fetcher)
    // console.log("data",data)
    return {...section, data: data || [], loading: isLoading, error}
  })
console.log("swr",swrData)


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

console.log("active",activeItem)

  return (
    <div ref={containerRef} className="h-full relative w-full">
       <Navbar />
      {/* active Item  */}
      <div className="">
        { activeSection?.data.results[activeItem] && (
            <div>
              <img
                src={`${baseImageUrl}${activeSection?.data.results[activeItem].backdrop_path}`}
                alt={activeSection?.data.results[activeItem].title}
                className="w-screen h-screen opacity-60 object-cover"
              />
              <div className="absolute top-50 left-20">
                <div className="flex items-center">
                    <span className="text-7xl font-bebas font-bold text-red-700 mr-2 ">N</span>
                    <span className="text-2xl font-medium">S E R I E S</span>
                </div>
                <h1 className="text-7xl font-bold overflow-wrap w-2/5 indent-14 mb-5">
                  {activeSection?.data.results[activeItem].title}
                </h1>
                <div className="font-bold flex items-end mb-5">
                  <div className="text-[8px] text-black bg-red-700 w-7 h-7 text-center rounded-md">TOP <span className="text-sm">20</span></div>
                  <div className="text-xl ml-2">#{activeItem + 1} in {activeSection.name} Today</div>
                </div>
                <p className="overflow-wrap w-2/5 font-medium text-xl mb-5">
                  {activeSection?.data.results[activeItem].overview}
                </p>
                <div>
                  <button className="text-black font-bold bg-white px-6 py-2 rounded-sm text-2xl hover:scale-105 transition-tranform duration-300"> ► Play </button>
                  <button className="font-bold bg-gray-600/75 px-8 py-3 rounded-sm text-xl ml-2 hover:scale-105 transition-tranform duration-300"> ❕ More Info </button>
                </div>
              </div>
            </div>
          )
        }
      </div>

      {/* section */}
      <div className="absolute">
        <div className="flex space-x-4 overflow-x-auto px-10 scrollbar-hide">
          {activeSection?.data.results.map((item,idx)=>(
            <div 
              key={idx}
              className={`flex-shrink-0 w-40 cursor-pointer ${
                idx === activeItem ? 'scale-110 transition-tranform duration-300 border-2 border-solid border-white'  : ''
              }` }
              onClick={()=> setActiveItem(idx)}
            >
              <span className="text-3xl font-bebas font-bold text-red-700">N</span>
              <img
                src={`${baseImageUrl}${item.poster_path}`}
                alt={item.title}/>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
}
