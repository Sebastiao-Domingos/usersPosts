import { api } from "@/infra/api";
import {PostAuthorData, PostData, PostsData } from "@/services/posts/Post";
import axios from "axios";
import { useQuery } from "react-query";


export async function getData() {
    const res = await api.get<{},{data:PostsData}>("http://localhost:3333/posts" )
    return res.data
}
    

async function getDataPosts(id:number){
    const res = await api.get<{},{data : PostAuthorData }>(`http://localhost:3333/posts/${id}`)

    return res.data;
}

function useGetPosts() {
    const {data , ...result} = useQuery("posts" , getData);

    return {
        posts : data, result : result
    };
}

export function useGetPost(id:number) {
    const {data , ...result} = useQuery("posts" , () => getDataPosts(id));

    return {
        post : data, result : result
    };
}

export default useGetPosts;