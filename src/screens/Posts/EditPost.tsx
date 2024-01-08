"use client"
import { isEmpty } from '@/helpers/empty';
import { useGetUsers } from '@/hooks/useActionUser';
import * as Dialog from '@radix-ui/react-dialog';
import React, { HTMLAttributes, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {OverlayModal, RootModal } from '../Users/CreateUser';
import { putPost } from '@/hooks/useActionPost';
import StateMutation from '@/components/StateComponent';
import { OnlyPostData } from '@/services/posts/Post';
import StateComponent from '@/components/StateComponent';


export default function EditPost({ post} :{ post : OnlyPostData}){
    const {data , result} = useGetUsers();
    const [ newPost , setNewPosts ]=useState({
        title  : post.title, content : post.content , author : post.authorId, published : post.published
    })
    const [states , setStates] = useState({
        isLoading : false, isSuccess : false , isError : false
    })

    const queryClient = useQueryClient();

    const mutation = useMutation(putPost, {
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
                id : post.id,
                title : newPost.title,
                content : newPost.content,
                authorId : newPost.author,
                published : newPost.published
            })
        }else {
            alert("Name or Email can not be empty")
        }
    }

    return (
        <ModalEdit
            title='Edit Post'
        >
             <form action="" onSubmit={handleSubmit}>
                <div className='space-y-5 mb-8'>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="author">Author <span className='text-orange-500'>*</span></label>
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
                    
                    <div className='flex gap-8'>
                        <Dialog.Close  className="space-x-2 px-6 py-3 rounded shadow hover:bg-black/10 active:bg-black/20 text-orange-500">Don't Save</Dialog.Close>
                        <button type='submit' className="space-x-2 px-6 py-3 rounded shadow hover:bg-black/10 active:bg-black/20 ">
                            <i className={`ri-user-add-line text-slate-400`}></i>
                            <span className="text-orange-500">Save</span>
                        </button>
                    </div>

                    <StateComponent states={states} />
                </div>
            </form>
        </ModalEdit>
    )
};

interface ModalProps extends HTMLAttributes<HTMLFormElement>{
    title : string , 
}

export function ModalEdit({title, children} : ModalProps){
    return (
        <RootModal>
            <Dialog.Trigger asChild>
                <button className="text-xl text-green-500 hover:text-green-700"><i className="ri-edit-box-line"></i></button>
            </Dialog.Trigger>
            <OverlayModal title={title} deleted ={false}>
                {children}
            </OverlayModal>
        </RootModal>
    )
}
