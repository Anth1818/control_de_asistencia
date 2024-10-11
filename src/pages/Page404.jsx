export default function Page404() {
    return (
        //  Error Container 
        <div className="flex flex-col items-center">
            <div className="text-indigo-500 font-bold text-7xl">
                404
            </div>

            <div className="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
                Esta página no existe
            </div>

            <div className="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
                La página que buscas no se encuentra en este servidor
            </div>
        </div>

    )
}