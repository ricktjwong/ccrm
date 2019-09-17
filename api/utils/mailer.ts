import { origin, transporter } from '../config'

export const sendEmail = async (email: string, subject: string, content: string) => {
  try {
    await transporter.sendMail({
      from: '"CCRM Admin" <no-reply@ccrm.gov.sg>',
      to: email,
      subject: subject,
      text: content,
    })
  } catch (e) {
    console.error(e)
  }
}

export const sendOTPViaEmail = async (email: string, token: string) => {
  let subject = 'Click link to sign in'
  let content = origin + '/login/callback?token=' + token
  try {
    await sendEmail(email, subject, content)
  } catch (error) {
    console.error(error)
  }
}
