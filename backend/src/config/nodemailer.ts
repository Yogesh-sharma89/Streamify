import { Resend } from "resend";
import AppError from "../utils/appError.ts";

const resend_key = process.env.RESEND_API_KEY;

const resend = new Resend(resend_key);



const sendEmail = async(email:string,subject:string,html:string)=>{

    try{

        const {data,error} = await resend.emails.send({
            from:process.env.EMAIL_USER!,
            to:email,
            subject,
            html
        })

        if(error){
           throw new AppError(error.message , 400)
        }

        console.log("Email sent with Id : ",data.id)

    }catch(err){
        console.log('failed to send email ',err)
    }

}

export const sendOtpVerificationEmail = async(email:string,otp:string)=>{

    const subject = 'Email Verification - Stream (chat , connect and video calls)';

    const html = `
    
         <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Stream - Verify OTP</title>
            <style>
                body {
                margin: 0;
                padding: 0;
                background: #0f172a;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                }

                .container {
                background: #111827;
                width: 100%;
                max-width: 480px;
                padding: 40px 30px;
                border-radius: 16px;
                text-align: center;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
                color: #ffffff;
                }

                .logo {
                font-size: 28px;
                font-weight: bold;
                letter-spacing: 1px;
                margin-bottom: 10px;
                color: #6366f1;
                }

                .tagline {
                font-size: 14px;
                color: #9ca3af;
                margin-bottom: 30px;
                }

                h2 {
                margin-bottom: 15px;
                font-weight: 600;
                }

                p {
                font-size: 14px;
                color: #cbd5e1;
                margin-bottom: 25px;
                }

                .otp-box {
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 8px;
                background: linear-gradient(90deg, #6366f1, #8b5cf6);
                padding: 18px;
                border-radius: 12px;
                margin-bottom: 20px;
                color: white;
                }

                .expire {
                font-size: 13px;
                color: #f87171;
                margin-bottom: 25px;
                }

                .footer {
                font-size: 12px;
                color: #6b7280;
                margin-top: 20px;
                }

                @media (max-width: 500px) {
                .container {
                    margin: 20px;
                    padding: 30px 20px;
                }

                .otp-box {
                    font-size: 26px;
                    letter-spacing: 5px;
                }
                }
            </style>
            </head>
            <body>

            <div class="container">
                <div class="logo">STREAM</div>
                <div class="tagline">Chat. Connect. Video Call.</div>

                <h2>Verify Your Account</h2>
                <p>Use the OTP below to complete your registration.</p>

                <!-- Replace 123456 dynamically -->
                <div class="otp-box">${otp}</div>

                <div class="expire">This OTP expires in 5 minutes.</div>

                <div class="footer">
                If you didn’t request this, you can safely ignore this message.
                </div>
            </div>

            </body>
            </html>

        `;

    await sendEmail(email,subject,html);
}



