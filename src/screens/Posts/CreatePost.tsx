"use client"
import StateMutation from '@/components/StateComponent';
import { isEmpty } from '@/helpers/empty';
import { useGetUsers } from '@/hooks/useActionUser';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Modal } from '../Users/CreateUser';
import { postPost } from '@/hooks/useActionPost';


export default function CreatePost({id} : {id : number | null}){
    const {data , result} = useGetUsers();
    const [ newPost , setNewPosts ]=useState({
        title  : "", content : "" , author : id || 0
    })
    const [states , setStates] = useState({
        isLoading : false, isSuccess : false , isError : false
    })

    const queryClient = useQueryClient();

    const mutation = useMutation(postPost, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('posts')
            setStates({...states , isError : false , isLoading: false , isSuccess : true})

            setTimeout(() => {
                setStates({...states , isSuccess : false})
            }, 7000);
        },
        onMutate(){
            setStates({...states, isLoading : true })
        },
        onError(){
            setStates( {...states , isError : true})
        }
    })
    const handleSubmit =(e: React.SyntheticEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(isEmpty(newPost.title) && isEmpty(newPost.content) && newPost.author !==0 ){
           mutation.mutate({
                title : newPost.title,
                content : newPost.content,
                authorId : newPost.author
            })
        }else {
            alert("Name or Email can not be empty")
        }
    }

    return (
        <Modal
            btIcon='ri-wallet-line'
            bttext='Create Post'
            title='Create a Post'
        >
            <form action="" onSubmit={handleSubmit}>
                <div className='space-y-5 mb-8'>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="author">Author <span className='text-orange-500'>*</span></label>
                        {/* <input className='p-3 rounded border border-orange-500/45 outline-none bg-slate-400/20' type="text" name="title" id="title" required
                            value={name}
                            onChange={(e) => setName(e.target.value) }
                        /> */}
                        { result.isSuccess && (
                            <select name="author" id="author"
                                value={newPost.author}
                                className='p-3 rounded border border-orange-500/45 outline-none bg-slate-400/20'
                                onChange={ (e) => setNewPosts({...newPost , author : Number(e.currentTarget.value)})}
                            >
                                <option value={0}>Select an Author</option>
                                {data?.users?.map( (author) => (
                                    <option key={author.id} value={author.id}>{author.name}</option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="title">Title <span className='text-orange-500'>*</span></label>
                        <input className='p-3 rounded border border-orange-500/45 outline-none bg-slate-400/20' type="text" name="title" id="title" required
                            value={newPost.title}
                            onChange={(e) => setNewPosts({...newPost , title : e.target.value}) }
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="content">Content <span className='text-orange-500'>*</span></label>
                        <textarea
                            className='p-3 rounded border border-orange-500/45 outline-none bg-slate-400/20'
                            name="content" id="content" cols={30} rows={3}
                            value={newPost.content}
                            onChange={ (e) => setNewPosts({...newPost , content : e.target.value})}
                            ></textarea>
                    </div>
                </div>

                <div className='flex items-center justify-between'>
                    <button type='submit' className="space-x-2 px-6 py-3 rounded shadow hover:bg-black/10 active:bg-black/20 ">
                        <i className={`ri-user-add-line text-slate-400`}></i>
                        <span className="text-orange-500">Save</span>
                    </button>

                    <StateMutation states={states} />
                </div>
            </form>
        </Modal>
    )
};

