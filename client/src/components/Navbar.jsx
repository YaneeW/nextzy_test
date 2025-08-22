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
    if(category){
        router.push(`/?category=${category}`)
    }else{
        router.push(`/`)
    }
  }

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <div className="w-2/4 bg-blue-500"> 
                  
                    {/* menu for destop */}
                    <div className="hidden md:flex flex-row items-center justify-evenly">
                        <h2 className="font-bebas font-bold text-red-700 text-5xl">Netflix</h2>
                        { categories.map((c)=>(
                            <button key={c.id} onClick={()=> handleClickCategory(c.value)} className="font-medium">
                                {c.name}
                            </button>
                        ))}
                        {/* <button className="font-medium">Home</button>
                        <button className="font-medium">TV Show</button>
                        <button className="font-medium">Movies</button>
                        <button className="font-medium">New & Popular</button>
                        <button className="font-medium">Browse by languages</button> */}
                    </div>

                    {/* menu for mobile */}
                    <div className="md:hidden flex items-center justify-evenly">
                    <button className="font-medium">Home</button>
                    <div>
                        <h2 className="font-bebas font-bold text-red-700 text-5xl">N</h2>
                        <button
                            onClick={()=> setIsOpen(!isOpen)}>
                        Categories ▾
                        </button>
                        {isOpen && (
                        <div>
                            {/* <select> */}
                            <option>TV Show</option>
                            <option>Movies</option>
                            <option>New & Popular</option>
                            <option>Browse by languages</option>
                            {/* </select> */}
                        </div>
                        )}
                    </div>
                    </div>
                    
                </div>
                <div className="w-1/5 flex flex-row items-center justify-end">
                    <MagnifyingGlassIcon className="h-5 w-5 mr-1" />
                    <input
                    className="bg-gray-800 h-5 w-30 mr-8 rounded-sm text-xs pl-2"
                    placeholder="search..."
                    />
                    <div className="bg-white text-red-700 h-10 w-10 flex items-center justify-center rounded-full font-bold  mr-2">N</div>
                    <span className="font-medium  mr-8">NextZy</span>
                </div>
            </div>
        </div>
    )
}