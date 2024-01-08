"use client"
import { redirect, useRouter } from "next/navigation";

export default function Home() {
    const routes = useRouter();
    return (
      <main className="mt-6 w-full min-h-[78vh] flex justify-center items-center">
        <div className="space-y-6 w-[60%] text-centers">
            <h1 className="text-orange-600 text-4xl text-center">System of Users and thers Posts</h1>

            <p className="text-center">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate autem atque alias deserunt laudantium quaerat! Dolor exercitationem dolorem inventore quae, id architecto molestiae dolorum distinctio animi, eligendi, iste fugit ducimus.
            </p>

            <div className="w-full flex justify-center items-center gap-6">
                <button className="flex rounded shadow hover:bg-orange-600" 
                    onClick={()=> routes.push("/users")}
                ><i className="px-4 py-3 text-orange-600 hover:text-white ri-user-line"></i></button>
                <button className="flex rounded shadow hover:bg-orange-600" 
                    onClick={()=> routes.push("/posts")}
                ><i className="px-4 py-3 text-orange-600 hover:text-white ri-wallet-line"></i></button>
            </div>
        </div>
      </main>
    )
}
