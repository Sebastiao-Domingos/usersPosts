"use client"
import { isEmpty } from '@/helpers/empty';
import { postData, putUser } from '@/hooks/useActionUser';
import * as Dialog from '@radix-ui/react-dialog';
import React, { HTMLAttributes, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Modal, OverlayModal, RootModal } from './CreateUser';
import { UserData, UserDataCreation } from '@/services/users/User';
import StateComponent from '@/components/StateComponent';


export default function EditUser({user} :{ user : UserDataCreation}){
    const [name ,setName] = useState(user.name);
    const [email ,setEmail] = useState(user.email);
    const [userData , setUserData] = useState({
        name : user.name,
        email : user.email,
        id : user.id
    })
    const [states , setStates] = useState({
        isLoading : false, isSuccess : false , isError : false
    })


    const queryClient = useQueryClient();

    const mutation = useMutation(putUser, {
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
    const handleSubmit =(e: React.SyntheticEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(isEmpty(userData.name) && isEmpty(userData.email)){
            
           mutation.mutate(userData);
        }else {
            alert("Name or Email can not be empty")
        }
    }

    return (
        <ModalEdit
            title='Edit User'
        >
            <form action="" onSubmit={handleSubmit}>
                <div className='space-y-5 mb-8'>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="name">Name <span className='text-orange-500'>*</span></label>
                        <input className='p-3 rounded border border-orange-500/45 outline-none bg-slate-400/20' type="text" name="name" id="name" required
                            value={userData.name}
                            onChange={(e) => setUserData({...userData , name:e.target.value})}
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="email">Email <span className='text-orange-500'>*</span></label>
                        <input className='p-3 rounded border border-orange-500/45 outline-none bg-slate-400/20' type="email" name="email" id="email" required
                            value={userData.email}
                            onChange={(e) => setUserData({...userData , email:e.currentTarget.value})}
                        />
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
