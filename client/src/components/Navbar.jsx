"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Navbar(){
    const router = useRouter()
    const categories = [
        {id:0, name:'Home', value: null},
        {id:1, name: 'TV Show', value: 'tv'},
        {id:2, name: 'Movies', value: 'movies'},
        {id:3, name: 'New & Popular', value: 'trending'},
        {id:4, name: 'Browse by language', value: 'discover'},
    ]
    const [isOpen,setIsOpen] = useState(false)

  function handleClickCategory (category){
    console.log("cat",category)
    if(category){
        router.push(`/?category=${category}`)
    }else{
        router.push(`/`)
    }
  }

    return (
        <div className="absolute top-3 left-0 w-full z-50 bg-transparent">
            {/* menu for destop */}
            <div className="flex flex-row items-center justify-between">
                <div className="hidden md:flex flex-row items-center justify-evenly w-3/5">
                    <h2 className="font-bebas font-bold text-red-700 text-base md:text-2xl lg:text-5xl 2xl:text-6xl">Netflix</h2>
                    { categories.map((c)=>(
                        <button key={c.id} onClick={()=> handleClickCategory(c.value)} className="md:font-medium text-base md:text-[10px] lg:text-lg 2xl:text-xl hover:scale-110 hover:duration-500 hover:transition-transfrom">
                            {c.name}
                        </button>
                    ))}
                </div>

                <div className="hidden w-1/5 md:flex flex-row items-center justify-end mr-2">
                    <MagnifyingGlassIcon className="min-h-3 min-w-3 w-5 h-5 mr-1" />
                    <input
                    className="bg-gray-800 h-3 w-20 mr-4 rounded-sm text-[10px] pl-2 lg:h-5 lg:w-30 lg:text-xs lg:mr-8"
                    placeholder="search..."
                    />
                    <div className="bg-white text-red-700 h-8 w-10 text-xl flex items-center justify-center rounded-full font-bold  mr-2 lg:h-10 lg:text-2xl">N</div>
                    <span className="hidden md:font-medium 2xl:inline lg:mr-8 lg:text-sm" >NextZy</span>
                </div>
            </div>
            

            {/* menu for mobile */}
            <div className="w-full my-6">
                <div className="md:hidden flex items-center justify-between">
                    <h2 className="font-bebas font-bold text-red-700 text-6xl ml-4">N</h2>
                    <div className=" w-2/5 flex flex-row items-center justify-end">
                        <MagnifyingGlassIcon className="h-2 w-2 mr-1" />
                        <input
                        className="bg-gray-800 h-3 w-20 mr-2 rounded-sm text-[6px] pl-2"
                        placeholder="search..."
                        />
                        <div className="bg-white text-red-700 h-6 w-6 text-sm flex items-center justify-center rounded-full font-bold mr-4">N</div>
                    </div>
                </div>
                <div className="md:hidden flex item-center justify-center w-full font-bold">
                    <button className=" text-md m-4">Home</button>
                    <div className="relative inline-block">
                        <button
                            className="m-4 px-4 py-2 rounded "
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            Categories ▾
                        </button>

                        {isOpen && (
                            <div className="absolute top-10 left-30 mt-2 w-30 border-1 rounded shadow-lg z-10 text-xs">
                            {categories.map(
                                (c) =>
                                c.id !== 0 && (
                                    <div
                                    key={c.id}
                                    onClick={() => handleClickCategory(c.value)}
                                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                    >
                                    {c.name}
                                    </div>
                                )
                            )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}