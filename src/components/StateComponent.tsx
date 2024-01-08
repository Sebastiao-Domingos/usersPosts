

type StatesType ={
    isLoading : boolean, isSuccess : boolean , isError : boolean
}

function StateMutation({states} : {states : StatesType}){
    return (
        <div className='relative'>
            {states.isLoading && (
                <div className='absolute right-0 animate-spin  border-4 border-x-orange-500 w-[30px] h-[30px] rounded-full '></div>
            )}
            {states.isSuccess && 
                <div className='absolute right-0  border w-[30px] h-[30px] rounded-full '>
                    <i className='ri-check-line text-2xl text-green-500'></i>
                </div>
            }
            {states.isError && 
                <div className='absolute right-0  border w-[30px] h-[30px] rounded-full '>
                    <i className='ri-close-line text-2xl text-red-500'></i>
                </div>
            }
        </div>
    )
}

export default StateMutation;