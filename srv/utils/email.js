const nodemailer = require('nodemailer');

const sendEmail = async (aEmployee) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,    // Email address
            pass: 'xokr mmyq zvmm sbgt'     // Email password or app-specific password
        }
    });


    const mailInfo = await transporter.sendMail(from,to,subject,text,{
        from: from,
        to: to,
        subject: `Logged in user verification.`,
        text: `Thank you for logging in, you are an authorized user ${aEmployee[0].EMP_NAME}`,
        html: `<p>Thank you for logging in, you are an authorized user <b>${aEmployee[0].EMP_NAME}</b>.</p>`,
        attachments: [{
            filename: 'Bhavesh_SAP_5+.pdf',
            path: '/home/user/projects/employeemgmt/files/Bhavesh_SAP_5+.pdf'

        }]
    });
    console.log(`Mail sent`, mailInfo.messageId);
}