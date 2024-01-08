"use client"
import SubHeader from "@/components/SubHeader";
import { useGetPost } from "@/hooks/useGetPosts";
import { useRouter } from "next/navigation";


function Post({params} : {params : {post : number}}) {
    const router = useRouter();
    const {post, result} = useGetPost(params.post)    
    return (  
        <div className="mt-9 min-h-[77vh]">
             {result.isSuccess &&(
                <SubHeader
                    icon="ri-wallet-line"
                    title={post?.title!}
                    ammount={0}
                >
                    <button className="space-x-2 px-4 py-3 rounded shadow group" 
                        onClick={()=> router.push("/posts")}
                    >
                        <i className="ri-close-line text-slate-300 group-hover:text-red-400"></i>
                    </button>    
                </SubHeader>
            )}
            
            {result.isLoading && <p className="w-full text-center italic text-orange-500">Is loading!......</p>}
            {result.isError && <p className="w-full text-center italic text-red-600">Error , to fetch the posts!...</p>}
           
            {result.isSuccess && (
                <div className="w-full flex flex-wrap gap-4 justify-between mt-6">
                    <div className="min-w-[400px] w-[48%] min-h[300px] shadow rounded p-4">
                        <h3 className="text-xl text-orange-500 space-x-2 pl-2 border-l">
                            <i className={`ri-wallet-line text-slate-300`}></i> 
                            <span>Post</span>
                        </h3>
                        <div>
                            <ul className="space-y-4 mt-6">
                                <li><span className="text-slate-400 italic">Title : </span> <span>{post?.title}</span> </li>
                                <li><span className="text-slate-400 italic">Content : </span> <span>{post?.content}</span> </li>
                                <li><span className="text-slate-400 italic">Published :</span> <span>{post?.published ? "YES" : "NO YET"}</span> </li>
                            </ul>
                        </div>

                    </div>
                    <div className="relative min-w-[500px] w-[48%] min-h-[300px] shadow rounded p-4">
                        <h3 className="text-xl text-orange-500 space-x-2 pl-2 border-l">
                            <i className={`ri-user-line text-slate-300`}></i> 
                            <span>Author</span>
                        </h3>
                        <div className="">
                            <ul className="space-y-4 mt-6">
                                <li><span className="text-slate-400 italic">Name : </span> <span>{post?.author?.name!}</span> </li>
                                <li><span className="text-slate-400 italic">Email : </span> <span>{post?.author?.email}</span> </li>
                            </ul>
                            <button className="absolute right-4 bottom-4 space-x-2 px-4 py-3 rounded shadow"
                                onClick={ () => router.push(`/users/${post?.author?.id}`)}
                            >
                                <i className="ri-user-add-line text-slate-300"></i>
                                <span className="text-orange-500">View Me</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}    
        </div>
    );
}

export default Post;