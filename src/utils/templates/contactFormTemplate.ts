const contactFormTemplate = ({
  name,
  email,
  phone,
  message,
}: {
  name: string
  email: string
  phone: string
  message: string
}): string => {
  return `
      <table style="border: 1px solid #ddd; padding: 16px; border-radius: 8px; background-color: #f9f9f9; max-width: 600px; margin: 0 auto; font-family: 'Rubik', sans-serif;">
        <tr>
          <td style="width: 100%; background-color: #E0E7FF; padding: 16px; text-align: center; border-radius: 8px 8px 0 0;">
            <table width="100%" border="0" cellpadding="16" cellspacing="0" style="border-radius: 8px 8px 0 0;">
              <tr>
                <td style="text-align: center;">
                  <img src="https://res.cloudinary.com/ddf0u9tgz/image/upload/v1724949908/emailLogo_rmmwdi.png" style="width: 150px; height: auto;" alt="Logo" />
                  <p style="margin: 10px 0 0; font-size: 18px; font-weight: bold; color: #8667F2;">New Contact Form Submission</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding: 16px; color: black; text-align: left;">
            <p>Hello,</p>
            <p>You have received a new contact form submission. Below are the details:</p>
            <table width="100%" cellpadding="8" cellspacing="0" style="margin-top: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <tr>
                <td style="background-color: #f1f1f1; font-weight: bold; color: #333;">Name:</td>
                <td style="background-color: #ffffff; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="background-color: #f1f1f1; font-weight: bold; color: #333;">Email:</td>
                <td style="background-color: #ffffff; color: #333;">${email}</td>
              </tr>
              <tr>
                <td style="background-color: #f1f1f1; font-weight: bold; color: #333;">Phone:</td>
                <td style="background-color: #ffffff; color: #333;">${
                  phone || 'Not Provided'
                }</td>
              </tr>
              <tr>
                <td style="background-color: #f1f1f1; font-weight: bold; color: #333;">Message:</td>
                <td style="background-color: #ffffff; color: #333;">${message}</td>
              </tr>
            </table>
  
            <div style="margin-top: 30px; padding: 10px 0; text-align: center;">
              <p style="font-size: 12px; color: #777777;">&copy; 2024 Devpulse. All rights reserved.</p>
            </div>
          </td>
        </tr>
      </table>
    `
}

export default contactFormTemplate
