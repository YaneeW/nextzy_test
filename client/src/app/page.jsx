"use client"
import {useState, useEffect, useContext} from 'react'
import { useSearchParams,useRouter } from 'next/navigation'
import { categorySections } from '@/lib/sectionData'
import Navbar from "../components/Navbar";
import {apiRequest} from '../lib/apiClientHandle'
import { MylistContext } from './context/MylistContext';
import Image from "next/image";



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
  const [loading,setLoading] = useState(true)
  // const [mylist,setMylist] = useState([])
  const {mylist,addToMylist,removeToMylist} = useContext(MylistContext)

  // สำหรับ refresh หน้า
  useEffect(()=>{
    router.replace('/')
  },[])

    // fetch ข้อมุลทีละ section
  useEffect(()=>{

    setLoading(true)

    const fetchSection = async () => {
      const result = []

        sectionData.map(item=> {return {
            ...item,
            isLoading: false, 
            error:false,
            errorMaessage:null
        }})

      for(const sec of sectionData){
        try{

          const data = await apiRequest('datalist','GET',`${category}/${sec.value}`)

          if(data.status === 'success'){
            result.push({
                ...sec,
                data:data.data,
                isLoading: false, 
                error:false,
                errorMaessage:null
            })
          }else{
            result.push({
                ...sec,
                data:null,
                isLoading: false, 
                error:true,
                errorMaessage:data.message
            })
          }
        }catch(error){
          result.push({
            ...sec,
            data:data.data,
            isLoading: false, 
            error:true,
            errorMaessage:error})
        }finally{
          setLoading(false)
        }
      }
      setSection(result)
    }

    
    fetchSection()
    setActiveItem(0)
  },[category,apiUrl,sectionData])

    

// สำหรับข้อมุลว่ากำลังอยู่ section ไหน
  const activeSection = section[currentSection]

  // เช็ค item ว่าถูก add เข้า mylist หรือยัง
  const isInMylist = mylist.some(item=> 
    item.id === activeSection?.data.results[activeItem].id
  )

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
  },[activeItem,activeSection])

  

  // สำหรับ click item บน section
  const handleClickItem = (secId,itemId) => {
    setActiveItem(itemId)
    setCurrentSection(secId)
  }

  const handleAddMylist = (list) => {
    addToMylist(list)
  }
  
  const handleRemoveMylist = (list) => {
    removeToMylist(list)
  }

  if(loading || section.length === 0) 
    return (
      <div className="flex items-center justify-center w-full h-full mt-100">
        <div className="lg:border-12 lg:h-30 lg:w-30 border-6 h-15 w-15 border-dotted border-red-700 animate-spin  relative rounded-full"> </div>
        <div className="absolute text-xs lg:text-xl">Loading</div>
      </div>
  ) 

  return (
    <div className=" relative h-full w-full min-h-screen">
       <Navbar />
       { activeSection.isLoading ? (
        <div classs="text-center text-xl font-medium">Liading</div>
       ):(
        <>
         {/* active Item  for destop*/}
        <div className="md:block hidden">
            { section.length > 0 && activeSection.data?.results[activeItem] && (
                <div className="relative w-full h-screen">
                { activeSection?.data.results[activeItem].backdrop_path ? (
                    <img
                    src={`${baseImageUrl}original${activeSection?.data.results[activeItem].backdrop_path}`}
                    alt={activeSection?.data.results[activeItem].title}
                    className="w-screen h-screen  object-cover mask-b-from-70% mask-b-to-80% mask-t-from-70% transition-opacity duration-700 "
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm">Not found the picture</div>
                )}
                <div className="absolute top-60 left-20 lg:top-30 lg:left-20 2xl:top-80 ">
                    <div className="flex items-center">
                        <span className="text-6xl font-bebas font-bold text-red-700 mr-2 lg:text-6xl lg:mr-2 2xl:text-7xl">N</span>
                        <span className="text-2xl font-medium 2xl:text-4xl">S E R I E S</span>
                    </div>
                    <h1 className="font-bold overflow-wrap  w-3/5 mb-5 indent-10 text-4xl lg:w-2/5 lg:text-6xl lg:indent-14 xl:text-5xl 2xl:text-7xl">
                    {activeSection?.data.results[activeItem].title}
                    </h1>
                    <div className="font-bold flex items-end mb-5">
                        <div className="text-[8px] text-black bg-red-700 w-7 h-7 text-center rounded-md 2xl:scale-150">TOP <span className="text-sm">20</span></div>
                        <div className=" text-md lg:text-xl 2xl:text-2xl ml-2">#{activeItem + 1} in {activeSection.name} Today</div>
                    </div>
                    <p className="overflow-wrap w-2/5 font-medium text-md lg:text-xl 2xl:text-2xl mb-5 line-clamp-3">
                    {activeSection?.data.results[activeItem].overview}
                    </p>
                    <div>
                      <button className="text-black font-bold bg-white px-6 py-2 rounded-sm text-2xl hover:scale-105 transition-tranform duration-300"> ► Play </button>
                      { isInMylist ? (
                        <button 
                          onClick={()=>handleRemoveMylist(activeSection?.data.results[activeItem])}
                          className="font-bold bg-gray-600/75 px-8 py-3 rounded-sm text-xl ml-2 hover:scale-105 transition-tranform duration-300"> 
                          ✓ In MyList
                        </button>
                      ): (
                        <button 
                          onClick={()=>handleAddMylist(activeSection?.data.results[activeItem])}
                          className="font-bold bg-gray-600/75 px-8 py-3 rounded-sm text-xl ml-2 hover:scale-105 transition-tranform duration-300"> 
                          + Add Mylist 
                        </button>
                      )}
                      
                    </div>
                </div>
                </div>
            )}
        </div>

        {/* active section for mobile */}
        <div className="md:hidden">
            { section.length > 0 && activeSection.data?.results[activeItem] && (
                <div className="w-full h-screen relative">
                { activeSection?.data.results[activeItem].poster_path ? (
                    <img
                    src={`${baseImageUrl}original${activeSection?.data.results[activeItem].poster_path}`}
                    alt={activeSection?.data.results[activeItem].title}
                    className="w-screen h-screen  object-fill mask-b-from-70% mask-b-to-80% mask-t-from-70% transition-opacity duration-700 "
                   
                    />
                ) :(
                    <div className="flex h-full items-center justify-center text-sm">Not found the picture</div>
                )}
                <div className="flex flex-col items-center justify-center w-full absolute top-130">
                    <div className="flex items-center">
                        <span className="text-3xl font-bebas font-bold text-red-700 mr-2">N</span>
                        <span className="text-sm font-medium">S E R I E S</span>
                    </div>
                    <h1 className="font-bold overflow-wrap  text-2xl w-3/5 mb-2 indent-4 text-center">
                    {activeSection?.data.results[activeItem].title}
                    </h1>
                    <div className="font-bold flex items-end mb-5">
                        <div className="text-[8px] text-black bg-red-700 w-7 h-7 text-center rounded-md 2xl:scale-150">TOP <span className="text-sm">20</span></div>
                        <div className=" text-md ml-2">#{activeItem + 1} in {activeSection.name} Today</div>
                    </div>
                    <div>
                    <button className="text-black font-bold bg-white px-4 py-1 rounded-sm text-xl hover:scale-105 transition-tranform duration-300"> ► Play </button>
                    </div>
                </div>
                </div>
            )}
        </div>
        </>
       )}
       {/* section */}
      <div className="absolute top-190 md:top-160 xl:top-130 w-full px-10 2xl:top-230 ">
        <div className="flex flex-col">
            { section.map((sec,idx)=>(
                <div key={idx} className="mb-5 pt-6 xl:pt-15">
                    <div className="font-bold text-xs md:text-xl">{sec.name} on Netflix</div>
                    { sec.isLoading ? (
                        <div classs="text-center text-xl font-medium">Loading</div>
                    ):(
                    <div className="flex space-x-4 overflow-x-auto px-2 xl:px-6 scrollbar-hide pt-8">
                        { sec.data.results.map((item,id)=>(
                            <div 
                                key={id}
                                id={`${idx}_${id}`}
                                ref={el =>  {
                                if(el && idx === currentSection && id === activeItem){
                                    el.scrollIntoView({ behavior: "smooth", inline: "end", block: "end" });
                                }
                                }}
                                className={`relative flex-shrink-0 w-30 md:w-40 cursor-pointer rounded-md md:rounded-lg ${
                                idx === currentSection  && id === activeItem ? 'scale-110 transition-transfrom -translate-y-2 duration-500 border-2 border-solid border-white z-20'  
                                : 'z-0'
                                }` }
                                onClick={()=> handleClickItem(idx,id)}
                            >
                                <span className="absolute top-2 left-2 text-3xl font-bebas font-bold text-red-700">N</span>
                                { item.poster_path ? (
                                <img
                                  className="rounded-lg transition-opacity duration-700"
                                  src={`${baseImageUrl}original${item.poster_path}`}
                                  alt={item.title}/>
                                ) : (
                                <div className="flex h-full items-center justify-center text-sm">Not found the picture</div>
                                ) }
                            </div>
                        ))}
                    </div>
                    )}
                </div>
            ))}
        </div>
      </div>
      
    </div>
  );
}
