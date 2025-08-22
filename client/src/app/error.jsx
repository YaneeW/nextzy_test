'use client'

export default function Error({error,reset}){
    return (
        <div className="text-center mt-60">
            <div className="font-bold mb-4">
                Something went wrong!
            </div>
            <button className="bg-gray-700 hover:bg-gray-800 p-2 rounded-md"
                onClick={()=> reset()}>
                Try again.
            </button>
        </div>
    )
}