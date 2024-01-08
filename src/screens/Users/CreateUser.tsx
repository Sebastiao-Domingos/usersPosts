"use client"
import StateMutation from '@/components/StateComponent';
import { isEmpty } from '@/helpers/empty';
import { postData } from '@/hooks/useActionUser';
import * as Dialog from '@radix-ui/react-dialog';
import React, { HTMLAttributes, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';


export default function CreateUser(){
    const [name ,setName] = useState("");
    const [email ,setEmail] = useState("");
    const [states , setStates] = useState({
        isLoading : false, isSuccess : false , isError : false
    })


    const queryClient = useQueryClient();

    const mutation = useMutation(postData, {
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

        if(isEmpty(name) && isEmpty(email)){
            
           mutation.mutate({
                name : name,
                email :email
            })
        }else {
            alert("Name or Email can not be empty")
        }
    }

    return (
        <Modal
            btIcon='ri-user-add-line'
            bttext='Create'
            title='Create a User'
        >
            <form action="" onSubmit={handleSubmit}>
                <div className='space-y-5 mb-8'>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="name">Name <span className='text-orange-500'>*</span></label>
                        <input className='p-3 rounded border border-orange-500/45 outline-none bg-slate-400/20' type="text" name="name" id="name" required
                            value={name}
                            onChange={(e) => setName(e.target.value) }
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="email">Email <span className='text-orange-500'>*</span></label>
                        <input className='p-3 rounded border border-orange-500/45 outline-none bg-slate-400/20' type="email" name="email" id="email" required
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />
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

interface ModalProps extends HTMLAttributes<HTMLFormElement>{
    title : string , 
    bttext : string ,
    btIcon : string,
}

export function Modal({title , btIcon ,bttext, children} : ModalProps){
    return (
        <RootModal>
            <Trigger 
                title={bttext}
                icon={btIcon}
            />
            <OverlayModal title={title} deleted = {false}>
                {children}
            </OverlayModal>
        </RootModal>
    )
}

export function Trigger({title , icon } : { title : string , icon : string}){
    return(
        <Dialog.Trigger className="space-x-2 px-4 py-3 rounded shadow active:bg-black/10">
            <i className={`${icon} text-slate-300`}></i>
            <span className="text-orange-500">{title}</span>
        </Dialog.Trigger>
    )
}

export function RootModal({children} : { children : React.ReactNode}){
    return (
        <Dialog.Root> {children}</Dialog.Root>
    )
}

export function OverlayModal({children , title , deleted } :{ title: string,deleted : boolean ,children : React.ReactNode}) {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/30 fixed inset-0' />
            <Dialog.Content className='absolute top-[30%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[500px] min-h-[100px] bg-slate-200 rounded shadow p-6'>
                <Dialog.Title className='text-xl text-orange-600 mb-4 flex flex-col' >
                    <span>{title}</span>
                    {!deleted &&
                        <span className='text-slate-400 text-sm italic'>All fields with <span className='text-red-500'>*</span> are obligatory</span>
                    }
                    </Dialog.Title>
                <Dialog.Close className='absolute top-4 right-4' >
                    <i className='ri-close-line'></i>
                </Dialog.Close>
                {children}
            </Dialog.Content>
        </Dialog.Portal>
    )
}