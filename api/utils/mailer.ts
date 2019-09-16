import nodemailer from 'nodemailer'

export const sendEmail = async (token: string) => {
  if (process.env.NODE_ENV === 'development') {
    try {
      let testAccount = await nodemailer.createTestAccount()
      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      })
      let info = await transporter.sendMail({
        from: '"CCRM Admin" <ccrm@admin.gov.sg>',
        to: 'rickwtj@gmail.com',
        subject: 'Sign in with this link',
        text: 'http://localhost:3000/login?token=' + token,
        html: 'http://localhost:3000/login?token=' + token,
      })
      /* eslint-disable no-console */
      console.log('Message sent: %s', info.messageId)
      /* eslint-disable no-console */
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    } catch (e) {
      console.error(e)
    }
  }
}
