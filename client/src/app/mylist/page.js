'use client'
import { MylistContext } from "../context/MylistContext"
import { useContext  } from "react"
import MoviesList from "@/components/MoviesList"
import Navbar from "@/components/Navbar"

export default function Mylist(){
    const {mylist} = useContext(MylistContext)

    return (
        <div>
            { mylist.length > 0 ? (
                <>
                    <Navbar/>
                    <MoviesList title={'Your lists'} list={mylist}/>
                </>
            ):(
                <>
                    <Navbar/>
                    <div className="text-sm my-50 mx-20 md:text-xl md:m-30 xl:text-2xl xl:m-40"> Not found movies in your list</div>
                </>
                 
            )}
            
        </div>
    )
}