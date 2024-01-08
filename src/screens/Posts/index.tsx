"use client"
import SubHeader from "@/components/SubHeader";
import useGetPosts from "@/hooks/useGetPosts";
import { useEffect } from "react";
import Link from "next/link"
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import DeletePost from "./Delete";

function Posts() {
    const { posts , result} = useGetPosts();
    return ( 
        <div className="mt-9 min-h-[78vh]">
            <SubHeader
                icon="ri-wallet-line"
                title="Posts"
                ammount={posts?.ammount!}
            >
                <CreatePost  id={null}/>
            </SubHeader>
           <div className="w-full">
                {result.isLoading && <p className="w-full text-center italic text-orange-500">Is loading!......</p>}
                {result.isError && <p className="w-full text-center italic text-red-600">Error , to fetch the posts!...</p>}
           
                {result.isSuccess && (
                    <div className="w-full py-6">
                        <div className="flex flex-col mt-6">
                            <div className="mt-5">
                                {posts?.posts?.length !==0 && (
                                    <table className="w-full border-spacing-0">
                                        <thead>
                                            <tr className="w-full border-b">
                                                <td className="py-4 pr-4">
                                                </td>
                                                <td className="p-4 border-l">Title</td>
                                                <td className="p-4">Content</td>
                                                <td className="p-4 text-center">Published</td>
                                                {/* <td className="p-4 text-center border-l">
                                                    <span>Views</span>     
                                                </td> */}
                                                <td className="p-4 text-center">
                                                    <span>Edit</span>
                                                </td>
                                                <td className="p-4 text-center"><span>Delete</span> </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {posts?.posts?.map((post,index)=>(
                                                <tr key={index} className="py-4 border-b border-slate-200/25 hover:bg-slate-200/25">
                                                    <td className="flex py-4"> <span className="flex justify-center items-center w-[45px] h-[45px] rounded-full bg-slate-200 text-orange-500">{post.title[0].toUpperCase()}</span></td>
                                                    <td className="p-4"><Link href={`/posts/${post.id}`} >{post.title}</Link> </td>
                                                    <td className="p-4"><Link href={`/posts/${post.id}`} >{post.content}</Link></td>
                                                    <td className="p-4 text-center">
                                                         <i className={`${post.published ?  "ri-check-line text-green-500" : "ri-close-line text-red-500"}`}></i>
                                                    </td>
                                                    <td className="py-4 px-2 text-center">
                                                        <EditPost post={post} />
                                                    </td>
                                                    <td className="py-4 px-2 text-center">
                                                        <DeletePost post={post} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                {posts?.posts?.length===0 && (
                                    <p className="text-center italic text-orange-500">No posts</p>
                                )}
                            </div>
                        </div>
                </div>
            )}
           
           </div>
        </div>
     );
}

export default Posts;