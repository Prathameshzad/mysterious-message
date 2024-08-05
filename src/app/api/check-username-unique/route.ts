import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import { z } from 'zod';
import { usernameValidation } from '@/schemas/signUpSchema';

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request :Request) {

    await dbConnect()

    try {
        const {searchParams} = new URL(request.url);
        const queryParams = {
            username: searchParams.get("username")
        }

        //validation
         const result = UsernameQuerySchema.safeParse(queryParams);

         if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameErrors?.length>0?usernameErrors.join(','):'Invalid query Parameters'
            }, {status: 400})
         }

        const {username} = result.data;

       const existingVerfiedUser = await UserModel.findOne({
            username, 
            isVerified: true
        })

        if(existingVerfiedUser){
            return Response.json({
                success: false,
                message: "Username is already taken",
            },{status:400})
        }

        return Response.json({
            success: true,
            message: "Username is unique",
        },{status:400})

    } catch (error) {
        console.log('Error while checking', error)
        return Response.json({
            success: false,
            message: 'Error while checking'
        }, {status:500})
    }
}