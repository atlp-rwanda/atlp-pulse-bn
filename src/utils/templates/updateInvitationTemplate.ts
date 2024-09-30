export default function updateInvitationTemplate(
  orgName: string,
  webLink: string,
  mobileLink: string
) {
  return `
    <table style="border: 1px solid #ddd; padding: 16px; border-radius: 8px; background-color: #f9f9f9; max-width: 600px; margin: 0 auto; font-family: 'Rubik', sans-serif;">
          <!-- Icon Container -->
          <tr>
              <td style="width: 100%; background-color: #E0E7FF; padding: 16px; text-align: center;">
                  <table width="100%" border="0" cellpadding="16" cellspacing="0" style="border-radius: 8px 8px 0 0;">
                      <tr>
                          <td style="text-align: center;">
                              <img src="https://res.cloudinary.com/ddf0u9tgz/image/upload/v1724949908/emailLogo_rmmwdi.png" style="width: 200px; height: 200px;" alt="Logo" />
                              <p style="margin: 10px 0 0; font-size: 18px; font-weight: bold; color: #8667F2;">Invitation Updated</p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <!-- Message Container -->
          <tr>
              <td style="padding: 16px; color: black; text-align: left;">
                  <p>Hello,</p>
                  <p>Your invitation to join <strong>${orgName}</strong> has been updated.</p>
                  <p>We invite you to review the updated invitation and accept it by clicking the appropriate button below:</p>
                  <!-- Buttons for Web and Mobile -->
                  <table style="width: 100%; text-align: center; margin-top: 20px;">
                      <tr>
                          <td>
                              <a href="${webLink}" style="text-decoration: none;">
                                  <button style="font-size: 16px; background-color: #8667F2; font-family: 'Rubik', sans-serif; text-align: center; border: none; border-radius: 3px; padding: 10px 20px; cursor: pointer; color: #fff;">
                                      Accept Invitation (Web)
                                  </button>
                              </a>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <a href="${mobileLink}" style="text-decoration: none;">
                                  <button style="font-size: 16px; background-color: #4CAF50; font-family: 'Rubik', sans-serif; text-align: center; border: none; border-radius: 3px; padding: 10px 20px; cursor: pointer; color: #fff; margin-top: 10px;">
                                      Accept Invitation (Mobile)
                                  </button>
                              </a>
                          </td>
                      </tr>
                  </table>
                  <p>If the buttons don't work, copy the appropriate link into your browser:</p>
                  <!-- Links for Web and Mobile -->
                  <p>Web: <a href="${webLink}" style="text-decoration: none; cursor: pointer;">${webLink}</a></p>
                  <p>Mobile: <a href="${mobileLink}" style="text-decoration: none; cursor: pointer;">${mobileLink}</a></p>
              </td>
          </tr>
      </table>
      `
}
