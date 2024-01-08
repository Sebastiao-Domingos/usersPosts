"use client"
import { deleteUser } from '@/hooks/useActionUser';
import * as Dialog from '@radix-ui/react-dialog';
import React, { HTMLAttributes, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { OverlayModal, RootModal } from './CreateUser';
import {  UserDataCreation } from '@/services/users/User';
import StateComponent from '@/components/StateComponent';


export default function DeleteUser( {user}: {user : UserDataCreation}){
    const [states , setStates] = useState({
        isLoading : false, isSuccess : false , isError : false
    })
    const queryClient = useQueryClient();

    const mutation = useMutation(deleteUser, {
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
            title={`Delete ${user.name}`}
        >
           <div className='w-full'>
                <h3>Do you want to delete is User?</h3>
                <div className='w-full flex justify-between items-center'>
                    <div className='w-full flex gap-8 mt-4'>
                        <Dialog.Close className='py-3 w-[120px] text-green-600 border border-green-500 bg-slate-300 text-center rounded shadow'>NO</Dialog.Close>
                        <button className='py-3 w-[120px] bg-red-600 text-white text-center rounded shadow'
                            onClick={ () => mutation.mutate(user.id!)}
                        >YES</button>
                    </div>
                    <StateComponent  states={states}/>
                </div>
           </div>
        </ModalDelete>
    )
};

interface ModalProps extends HTMLAttributes<HTMLDivElement>{
    title : string , 
}

export function ModalDelete({title, children} : ModalProps){
    return (
        <RootModal>
            <Dialog.Trigger asChild>
                <button className="text-xl text-red-500/50 hover:text-rose-500"><i className="ri-delete-bin-7-line"></i></button>
            </Dialog.Trigger>
            <OverlayModal title={title} deleted = {true}>
                {children}
            </OverlayModal>
        </RootModal>
    )
}
