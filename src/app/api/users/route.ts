import UserService from "@/services/users/User";
import axios from "axios";
import { NextResponse } from "next/server";


async function GET() {
    
    try {
        const service = new UserService();
        const body = await service.get();
        const {response} = body;
        return NextResponse.json(response);
    } catch (error) {
        if(axios.isAxiosError(error)){
            if(error.response?.status){
                return NextResponse.json(error.message , {
                    status :error.status
                })
            }
        }

        return NextResponse.json( 
            {
                error : "Erro desconhecido", status : 500
            }
        )
    }
    
    
}

export  {GET};