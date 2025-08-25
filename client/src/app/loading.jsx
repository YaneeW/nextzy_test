export default function Loading() {
  return (
      <div className="flex items-center justify-center w-full h-full mt-100">
        <div className="lg:border-12 lg:h-30 lg:w-30 border-6 h-15 w-15 border-dotted border-red-700 animate-spin  relative rounded-full"> </div>
        <div className="absolute text-xs lg:text-xl">Loading</div>
      </div>
  )
}