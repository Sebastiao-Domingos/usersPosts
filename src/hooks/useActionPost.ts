import { api } from "@/infra/api"
import { OnlyPostData, PostData } from "@/services/posts/Post"


 const postPost = async (post : PostData) => {
    // console.log(post);
    try {
        const res = await api.post<{},{data : OnlyPostData}>("http://localhost:3333/posts", post)
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const putPost = async (post : OnlyPostData) => {
    // console.log(post);
    try {
        const res = await api.put<{},{data : OnlyPostData}>(`http://localhost:3333/posts/${post.id}`, post)
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const deletePost = async (id: number) => {
    // console.log(post);
    try {
        const res = await api.delete<{},{data : OnlyPostData}>(`http://localhost:3333/posts/${id}`)
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}
export {postPost , putPost , deletePost}