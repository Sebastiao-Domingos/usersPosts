"use client"
import * as Dialog from '@radix-ui/react-dialog';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import StateComponent from '@/components/StateComponent';
import { ModalDelete } from '../Users/Delete';
import { deletePost } from '@/hooks/useActionPost';
import { OnlyPostData } from '@/services/posts/Post';
export default function DeletePost( {post}: {post : OnlyPostData}){
    const [states , setStates] = useState({
        isLoading : false, isSuccess : false , isError : false
    })
    const queryClient = useQueryClient();

    const mutation = useMutation(deletePost, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('posts')
            setStates({isError:false, isLoading : false ,isSuccess : true})
            setTimeout(() => {
                setStates({...states, isLoading: false})
            }, 7000);
        },
        onMutate(){
            setStates({...states , isLoading:false});
        },
        onError(){
            setStates({...states , isError:true})
        }
    })
    
    return (
        <ModalDelete
            title={`Delete ${post.title}`}
        >
           <div className='w-full'>
                <h3>Do you want to delete this post?</h3>
                <div className='w-full flex justify-between items-center'>
                    <div className='w-full flex gap-8 mt-4'>
                        <Dialog.Close className='py-3 w-[120px] text-green-600 border border-green-500 bg-slate-300 text-center rounded shadow'>NO</Dialog.Close>
                        <button className='py-3 w-[120px] bg-red-600 text-white text-center rounded shadow'
                            onClick={ () => mutation.mutate(post?.id!)}
                        >YES</button>
                    </div>
                    <StateComponent  states={states}/>
                </div>
           </div>
        </ModalDelete>
    )
};


