import mailer from 'nodemailer'

export default async function sendMail({
    email,
    url,
    token
}: {
    email: string
    url: string
    token: string
}) {

    const testAccount = await mailer.createTestAccount()

    const transporter = mailer.createTransport({    
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })

    const mailOptions = {
        from: '"John Doe" <j.doe@example.com>',
        to: email,
        subject: 'Login to your account',
        html: `<a href="${url}/auth/login#token=${token}">Click here to Login to your account</a>`
    }

    const info = await transporter.sendMail(mailOptions)

    console.log('Message sent: %s', mailer.getTestMessageUrl(info))

}