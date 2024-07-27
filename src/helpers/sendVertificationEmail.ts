import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerficationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVertificationEmail(
    email: string,
    username: string,
    verifyCode: string
):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'prathameshzad20@gmail.com',
            to: email,
            subject: 'Verification code',
            react: VerificationEmail({username, otp:verifyCode}),
          });
        return{success:true, message: 'send verification code'}
    } catch (emailError) {
        console.error('Error sending verification email',emailError)
        return{success:false, message: 'Failed to send verification code'}
    }
}