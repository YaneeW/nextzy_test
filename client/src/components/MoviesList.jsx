
import { useContext } from "react"
import { MylistContext } from "@/app/context/MylistContext"
const baseImageUrl = process.env.NEXT_PUBLIC_BASE_TMDB_URL

export default function MoviesList({title,list}){

  const {mylist,addToMylist,removeToMylist} = useContext(MylistContext)

    // เช็ค item ว่าถูก add เข้า mylist หรือยัง แล้วเพิ่ม status ทุกตัว
  const listWithCheckMyList = list.map(li=>({
    ...li,
    isInMylist:mylist.some(item=> item.id === li.id)
  }))

  const handleAddMylist = (list) => {
    addToMylist(list)
  }
  
  const handleRemoveMylist = (list) => {
    removeToMylist(list)
  }

    return (
        <div className="absolute top-40 ml-30">
            <h1 className="text-2xl font-medium mb-10">{title}</h1>
            <div className="flex flex-wrap gap-4">
                {listWithCheckMyList.map((li,idx)=>(
                    <div key={idx} className="bg-gray-800 relative group cursor-pointer w-80 h-45 ">
                        { li.backdrop_path ? (
                            <div>
                                 <img
                                    src={`${baseImageUrl}original${li.backdrop_path}` || `${baseImageUrl}original${li.poster_path}`}
                                    alt={li.title}
                                    className="shadow-md object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-around opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white font-semibold text-center px-2">{li.title || li.name}</span>
                                    { li.isInMylist ? (
                                        <button className="px-2 bg-gray-700 rounded-md  font-bol" onClick={()=>handleRemoveMylist(li)}>✓</button>
                                    ): (
                                        <button className="px-2 bg-gray-700 rounded-md font-bold" onClick={()=>handleAddMylist(li)}>+</button>
                                    )}                                    
                                </div>
                            </div>
                        ): (
                            <div>
                                <div className="flex h-full items-center justify-center text-sm">Not found the picture</div>
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center  justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white font-semibold text-center px-2">{li.title || li.name}</span>
                                    { li.isInMylist ? (
                                        <button className="px-2 bg-gray-700 rounded-md  font-bol" onClick={()=>handleRemoveMylist(li)}>✓</button>
                                    ): (
                                        <button className="px-2 bg-gray-700 rounded-md font-bold" onClick={()=>handleAddMylist(li)}>+</button>
                                    )}        
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
        </div>
    )
}