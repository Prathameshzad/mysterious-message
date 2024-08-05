import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import { authOptions } from '../auth/[...nextauth]/options';
import { getServerSession, User } from 'next-auth';
import mongoose from 'mongoose';

export async function GET(request:Request){
    await dbConnect();

    const session = await getServerSession(authOptions)
 
    const user:User = session?.user as User
 
    if(!session || !session.user){
     return Response.json({
         success: false,
         message: "Not authenicated"
     },{status:500})
    }
    const userId = new mongoose.Types.ObjectId(user._id);

}