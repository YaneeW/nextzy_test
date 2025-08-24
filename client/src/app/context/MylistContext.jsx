import { Chilanka } from "next/font/google";
import { createContext, useState } from "react";

export const MylistContext = createContext()

export const MylistProvider = ({children}) => {
    const [mylist,setMylist] = useState([])

    const addToMylist = (list) => {
        setMylist(prev=>{
        if(!prev.some(i => i.id === list.id)){
            return [...prev,list]
        }
        // ถ้ามีแล้วไม่แอด
        return prev 
        })
    }
  
    const removeToMylist = (list) => {
        setMylist(prev=>{
        if(prev.some(i=> i.id === list.id)){
            return prev.filter(i=> i.id !== list.id)
        }
        return prev
        })
    }

  return (
    <MylistContext.Provider value={{mylist,addToMylist,removeToMylist}}>
        {children}
    </MylistContext.Provider>
  )
}