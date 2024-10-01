export default function registrationRequest(
  email: string,
  name: string,
  description: string
) {
  return `
    <table 
      width="100%" 
      style="max-width: 600px; margin: 0 auto; font-family: 'Rubik', sans-serif; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);"
    >
      <tr>
        <td style="background-color: #004aad; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
				 <img src="https://www.hostinger.vn/huong-dan/wp-content/uploads/sites/10/2020/04/cach-lam-email-marketing-tot-nhat-1024x640.jpg" alt="Organization Logo" style="border-radius: 5px; width: 300px;"/>
        </td>
      </tr>

      <tr>
        <td style="background-color: #f4f4f4; padding: 30px;">
          <h2 style="font-size: 24px; color: #004aad; text-align: center; margin-bottom: 20px;">
            New Organization Registration Request
          </h2>

          <p style="font-size: 18px; color: #333; text-align: center; margin-bottom: 20px; line-height: 1.6;">
            A user with email <strong>${email}</strong> has requested to register a new organization.
          </p>

          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 16px; font-weight: bold; color: #555; margin-bottom: 15px; text-align: center;">
              Details:
            </p>

            <table width="100%" style="text-align: left; margin-top: 10px; border-collapse: collapse; color: #333;">
              <tr>
                <td style="padding: 10px; width: 150px; font-weight: bold; color: #004aad; background-color: #f7f7f7; border-bottom: 1px solid #e0e0e0;">User Email:</td>
                <td style="padding: 10px; background-color: #f7f7f7; border-bottom: 1px solid #e0e0e0;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; width: 150px; font-weight: bold; color: #004aad; background-color: #f7f7f7; border-bottom: 1px solid #e0e0e0;">Organization Name:</td>
                <td style="padding: 10px; background-color: #f7f7f7; border-bottom: 1px solid #e0e0e0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; width: 150px; font-weight: bold; color: #004aad; background-color: #f7f7f7;">Organization Description:</td>
                <td style="padding: 10px; background-color: #f7f7f7; word-break: break-word;">${description}</td>
              </tr>
            </table>
          </div>
        </td>
      </tr>

      <tr>
        <td style="background-color: #004aad; padding: 20px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
          <p style="font-size: 14px; color: #ffffff;">
            This is an automated email. Please do not reply.
          </p>
          <p style="font-size: 14px; color: #ffffff;">
            © 2024 Pulse | <a href="#" style="color: #ffffff; text-decoration: underline;">Privacy Policy</a>
          </p>
        </td>
      </tr>
    </table>
  `
}
