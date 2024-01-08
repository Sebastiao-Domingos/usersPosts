import { api } from "@/infra/api";
import axios from "axios";
import { OnlyPostData, PostData } from "../posts/Post";


export type UserDataCreation ={
    id?: number,
    name : string , 
    email : string
}
export type UsersData={
    users : UserDataCreation[]
    amount : number;
}


export type UserData = {
	id?: number,
	email: string,
	name: string,
	posts: OnlyPostData[]
}

class UserService {
    /**
     * create
     */
    public async create( user : UserDataCreation) {
        const response = await api.post<{},{data : UserDataCreation}>("/users",user ,
            {headers : {}}
        ).then( res => res.data)

        return {
            status : 200,
            response
        }
    }
    /**
     * get
     */
    public async get() {
        const response = await axios.get<{},{data:UsersData}>('/users').then( res => res.data);

        return {
            status : 200,
            response
        }
    }
}


export default  UserService;