export default function organizationCreatedTemplate(
  orgName: string,
  email: string,
  password?: string
) {
  return /* html */ `
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
            Congratulations! Your organization <strong>${orgName}</strong> was created successfully.
          </h2>

          <p style="font-size: 16px; color: #333; text-align: center; margin-bottom: 20px; line-height: 1.6;">
            You can now log in using the organisation credentials provided below:
          </p>

          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 16px; font-weight: bold; color: #555; margin-bottom: 15px; text-align: center;">
              Your Organisation Credentials:
            </p>

            <table width="100%" style="text-align: left; margin-top: 10px; border-collapse: collapse; color: #333;">
              <tr>
                <td style="padding: 10px; width: 150px; font-weight: bold; color: #004aad; background-color: #f7f7f7; border-bottom: 1px solid #e0e0e0;">Email:</td>
                <td style="padding: 10px; background-color: #f7f7f7; border-bottom: 1px solid #e0e0e0;">${email}</td>
              </tr>
              ${
                password
                  ? `<tr>
                       <td style="padding: 10px; width: 150px; font-weight: bold; color: #004aad; background-color: #f7f7f7;">Password:</td>
                       <td style="padding: 10px; background-color: #f7f7f7; word-break: break-word;">${password}</td>
                     </tr>`
                  : ''
              }
            </table>
          </div>

          <p style="font-size: 14px; font-family: 'Rubik'; margin-top: 20px; text-align: center; color: #555;">
            Click the button below to log in to your organization's portal.
          </p>

          <div style="text-align: center; margin-top: 20px;">
            <a href="${
              process.env.FRONTEND_LINK
            }/login/org" style="text-decoration: none;">
              <button
                style="
                  font-size: 16px;
                  background-color: #004aad;
                  color: #fff;
                  border: none;
                  padding: 10px 20px;
                  border-radius: 5px;
                  cursor: pointer;
                "
              >
                Login to Organization
              </button>
            </a>
          </div>
        </td>
      </tr>

      <!-- Footer -->
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
