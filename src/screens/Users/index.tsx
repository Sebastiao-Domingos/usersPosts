"use client"
import SubHeader from "@/components/SubHeader";
import { getData, useActionUser, useGetUsers } from "@/hooks/useActionUser";
import Link from "next/link";
import  CreateUser from "./CreateUser";
import { useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";
import EditUser from "./EditUser";
import DeleteUser from "./Delete";


// async function getData() {
//     const res = await axios.get<{},{data:UsersData}>("http://localhost:3333/users")
//     return res.data
// }

function Users() {
    const {data , result} = useGetUsers();
    return ( 
        <div className="w-full mt-9 min-h-[78vh]">
           <SubHeader
                icon="ri-user-line"
                title="Users"
                ammount={ data && data.amount}
           >
                <CreateUser />
           </SubHeader>
           <div className="py-4">
                {result.isSuccess && (
                    <table className="w-full border-spacing-0">
                        <thead>
                            <tr className="w-full border-b">
                                <td className="py-4 pr-4">
                                </td>
                                <td className="p-4 border-l">Name</td>
                                <td className="p-4">Email</td>
                                {/* <td className="p-4 text-center border-l">
                                    <span>Views</span>     
                                </td> */}
                                <td className="p-4 text-center border-l">
                                    <span>Edit</span>
                                </td>
                                <td className="p-4 text-center"><span>Delete</span> </td>
                            </tr>
                        </thead>
                        <tbody>
                            {data!.users.map((user,index)=>(
                                <tr key={index} className="py-4 border-b border-slate-200/25 hover:bg-slate-200/25">
                                    <td className="flex py-4"> <span className="flex justify-center items-center w-[45px] h-[45px] rounded-full bg-slate-200 text-orange-500">{user.name[0].toUpperCase()}</span></td>
                                    <td className="p-4"><Link href={`/users/${user.id}`} >{user.name}</Link> </td>
                                    <td className="p-4"><Link href={`/users/${user.id}`} >{user.email}</Link></td>
                                    {/* <td className="py-4 px-2  text-center">
                                        <button className="text-xl text-blue-500 hover:text-blue-700"><i className="ri-eye-2-line"></i></button>
                                    </td> */}
                                    <td className="py-4 px-2 text-center">
                                        <EditUser user={user} />
                                    </td>
                                    <td className="py-4 px-2 text-center">
                                        <DeleteUser user={user} />
                                        {/* <button className="text-xl text-red-500/50 hover:text-rose-500"><i className="ri-delete-bin-7-line"></i></button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 )} 

                 {result.isLoading && (
                    <div className="w-full text-center">
                        <p className="italic">Is loading!.....</p>
                    </div>
                 )}

                {result.isError && (
                    <div className="w-full text-center">
                        <p className="italic text-red-500">Upsi!... some is wrong</p>
                    </div>
                 )}
           </div>
        </div>
     );
}

export default Users;