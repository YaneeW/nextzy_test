'use client'
import {useState,useEffect} from 'react'
import {apiRequest} from '../../lib/apiClientHandle'
import MoviesList from '../../components/MoviesList'
import { useSearchParams } from 'next/navigation'
import Navbar from "../../components/Navbar";


export default function SearchPage(){

    const searchParams = useSearchParams()
    const keyword  = searchParams.get('q') || ""

    const [list,setList] = useState({
        listData: null,
        isLoading: true,
        error: false,
        errorMessage: null
    })

    useEffect(()=>{
        const fetchSearch = async ()=>{
            try{
                const response = await apiRequest('datalist','GET',`search/all?keyword=${keyword}`,null)
                if(response.status === 'success'){
                    setList({
                        listData: response.data,
                        isLoading: false,
                        error: false,
                        errorMessage: null
                    })
                }else{
                    setList({
                        listData: null,
                        isLoading: false,
                        error: true,
                        errorMessage: response.message
                    })
                }
            }catch(error){
                setList({
                    listData: null,
                    isLoading: false,
                    error: true,
                    errorMessage: error
                })
            }
        }
        fetchSearch()
    },[keyword])

    return (
        <div className="relative h-full w-full min-h-screen">
            
            { list.isLoading ? (
                <div>
                    <div className="flex items-center justify-center w-full h-full mt-100">
                        <div className="lg:border-12 lg:h-30 lg:w-30 border-6 h-15 w-15 border-dotted border-red-700 animate-spin  relative rounded-full"> </div>
                        <div className="absolute text-xs lg:text-xl">Loading</div>
                    </div>
                </div>
            ): list.error ? (
                <div>{list.errorMessage || 'Something went wrong. try again'}</div>
            ) : list.listData.results.length > 0 ?(
                <>
                    <Navbar />
                    <MoviesList title={`Result of "${keyword}"`} list={list.listData.results}/>
                </>
            ) : (
                <div>Not Found as your keyword</div>
            )}
        </div>
    )
}