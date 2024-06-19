import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
      
      const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if(emailType === "VERIFY"){

          const updateUser = await User.findByIdAndUpdate(userId,
            {
              $set:{
                verifyToken: hashedToken,
                verifyTokenExpiry:new Date(Date.now()+3600000)
              }})
        }else if(emailType === "RESET"){
          const updateUser = await User.findByIdAndUpdate(userId,
            {
              $set:{
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry:new Date(Date.now()+3600000)
              }})
        }
        
        const transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "fbd72286a2c3b2",
            pass: "e1944604a78108"
          }
        });

          const mailOptions = {
            from: 'judhistirbehera532@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your Email" : "Reset Your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "VerifyYour Email" : "Reset Your Password"} or copy and paste the linkbelow in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`,
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse

    } catch (error:any) {
        throw new Error(error.message)
    }
}