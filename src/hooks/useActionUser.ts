import UserController from "@/controllers/user/UserController"
import { UserData, UserDataCreation, UsersData } from "@/services/users/User";
import axios from "axios";
import { useQuery} from "react-query";


export async function getData() {
const res = await axios.get<{},{data:UsersData}>("http://localhost:3333/users" )
  return res.data
}

export async function postData( user: UserDataCreation) {
  const res = await axios.post<{},{data:UserDataCreation}>("http://localhost:3333/users", user)
    return res.data
}
async function useActionUser() {

    const users = await getData();

    return {users};
}

export async function putUser(user : UserDataCreation) {
  const res = await axios.put<{},{data:UserDataCreation}>(`http://localhost:3333/users/${user.id}`,user)
  return res.data
}

export async function getUser(id : number) {
  const res = await axios.get<{},{data:UserData}>(`http://localhost:3333/users/${id}`)
  return res.data
}

async function useGetUser(id : number) {

    const user = await getUser(id);

    return {user};
}

export {useActionUser , useGetUser}

export function useGetUsers() {
    const {data , ...result} = useQuery("users" , getData);
  
    return {
      data : data, result : result
    }
}

export function useGetUserData( id : number ) {

    const {data , ...result} = useQuery("user" , () => getUser(id) )

    return {
      data : data , result : result
    }
}


export async function deleteUser(id : number){
  const res = axios.delete<{},{data : UserDataCreation}>(`http://localhost:3333/users/${id}`)

  return (await res).data
}
