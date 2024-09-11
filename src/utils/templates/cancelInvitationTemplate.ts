export default function cancelInvitationTemplate(orgName: string): string {
  return `
    <table style="border: 1px solid #ddd; padding: 16px; border-radius: 8px; background-color: #f9f9f9; max-width: 600px; margin: 0 auto; font-family: 'Rubik', sans-serif;">
          <!-- Icon Container -->
          <tr>
              <td style="width: 100%; background-color: #FFD3D3; padding: 16px; text-align: center;">
                  <table width="100%" border="0" cellpadding="16" cellspacing="0" style="border-radius: 8px 8px 0 0;">
                      <tr>
                          <td style="text-align: center;">
                              <img src="https://res.cloudinary.com/ddf0u9tgz/image/upload/v1724949908/emailLogo_rmmwdi.png" style="width: 200px; height: 200px;" alt="Logo" />
                              <p style="margin: 10px 0 0; font-size: 18px; font-weight: bold; color: #FF0000;">Invitation Cancelled</p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <!-- Message Container -->
          <tr>
              <td style="padding: 16px; color: black; text-align: left;">
                  <p>Hello,</p>
                  <p>We regret to inform you that the invitation to join <strong>${orgName}</strong> has been cancelled.</p>
                  <p>If you have any questions, feel free to contact us.</p>
              </td>
          </tr>
      </table>
      `
}
