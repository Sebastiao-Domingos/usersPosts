"use client"
import SubHeader from "@/components/SubHeader";
import { useGetUserData } from "@/hooks/useActionUser";
import CreatePost from "@/screens/Posts/CreatePost";
import DeletePost from "@/screens/Posts/Delete";
import EditPost from "@/screens/Posts/EditPost";
import Link from "next/link";
import { useRouter } from "next/navigation";

function User({ params }: { params: { user: number } }) {
    const id = params.user;
    const route = useRouter();
    const {data:user , result} = useGetUserData(id);
    return ( 
        <div className="mt-9 min-h-[77vh]">
            {result.isFetched &&(
                <SubHeader
                    icon="ri-user-line"
                    title={user?.name!}
                    ammount={user?.posts.length!}
            >
                    <button className="space-x-2 px-4 py-3 rounded shadow group" 
                        onClick={ ()=> route.push("/users")}
                    >
                        <i className="ri-close-line text-slate-300 group-hover:text-red-400"></i>
                    </button>    
                </SubHeader>
            )}

            {result.isSuccess && (
                <div className="w-full py-6">
                        <div>
                            <ul className="space-y-4">
                                <li><span className="text-slate-300 italic">Name : </span> <span>{user!.name}</span></li>
                                <li><span className="text-slate-300 italic">Email : </span> <span>{user!.email}</span></li>
                                <li><span className="text-slate-300 italic">Number of posts : </span> <span>{user!.posts.length}</span></li>
                            </ul>
                        </div>

                        <div className="flex flex-col mt-6">
                            <div className="w-full flex flex-row items-center justify-between"> 
                                <h2 className="p-2 border-l-2 border-orange-500">{user!.name.toUpperCase()}'S POSTS</h2>

                                {/* <button className="space-x-2 px-4 py-3 rounded shadow">
                                    <i className="ri-image-add-line text-slate-300"></i>
                                    <span className="text-orange-500">Create</span>
                                </button>  */}

                                <CreatePost id={user?.id!} /> 
                            </div>
                            <div className="mt-5">
                                {user!.posts.length !==0 && (
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
                                            {user!.posts.map((post)=>(
                                                <tr key={post.id} className="py-4 border-b border-slate-200/25 hover:bg-slate-200/25">
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
                                {user!.posts.length ===0 && (
                                    <p className="text-center italic text-orange-500">No posts</p>
                                )}
                            </div>
                        </div>
                </div>
            )}
            { result.isLoading && (
                <div className="w-full text-center">
                    <p>Is Loading...</p>
                </div>
            )}
        </div>
     );
}

export default User;