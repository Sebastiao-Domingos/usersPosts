
export type PostData = {
    title: string,
    content: string,
    authorId: number
}

export type PostAuthorData ={
	id?: number,
	title: string,
	content: string,
	published: boolean,
	authorId: number,
	author: {
		id: 8,
		email:string,
		name: string
	}
}

export type OnlyPostData = {
    id?: number,
	title: string,
	content: string,
	published: boolean,
	authorId: number,
}

export type PostsData = {
	posts : OnlyPostData[],
	ammount: number
}


class PostService {
    
}


export default PostService