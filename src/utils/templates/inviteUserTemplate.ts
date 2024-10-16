import { capitalizeStrings } from "../capitalizeRoleName"
export default function Template(orgName: string, link: string, role: string) {
  return `
  <table style="border: 1px solid #ddd; padding: 16px; border-radius: 8px; background-color: #f9f9f9; max-width: 600px; margin: 0 auto; font-family: 'Rubik', sans-serif;">
        <!-- Icon Container -->
        <tr>
            <td style="width: 100%; background-color: #E0E7FF; padding: 16px; text-align: center;">
                <table width="100%" border="0" cellpadding="16" cellspacing="0" style="border-radius: 8px 8px 0 0;">
                    <tr>
                        <td style="text-align: center;">
                            <img src="https://res.cloudinary.com/ddf0u9tgz/image/upload/v1724949908/emailLogo_rmmwdi.png" style="width: 200px; height: 200px;" alt="Logo" />
                            <p style="margin: 10px 0 0; font-size: 18px; font-weight: bold; color: #8667F2;">Welcome to Devpulse</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <!-- Message Container -->
        <tr>
            <td style="padding: 16px; color: black; text-align: left;">
                <p>Hello,</p>
                <p>Congratulations again for being selected to be part of the ${orgName}.</p>
                <p>We would like to invite you to join <strong>${orgName}</strong> as <strong>${capitalizeStrings(role)}</strong> , where you will be accessing all the information about the program.</p>
                <p>Click the button below to accept and join the program:</p>
                <!-- Button -->
                <table style="width: 100%; text-align: center; margin-top: 20px;">
                    <tr>
                        <td>
                            <a href="${link}" style="text-decoration: none;">
                                <button style="font-size: 16px; background-color: #8667F2; font-family: 'Rubik', sans-serif; text-align: center; border: none; border-radius: 3px; padding: 10px 20px; cursor: pointer; color: #fff;">
                                    Accept Invitation
                                </button>
                            </a>
                        </td>
                    </tr>
                </table>
                <p>If the button doesn't work, copy this link into your browser:</p>
                <!-- Link -->
                <a href="${link}" style="text-decoration: none; cursor: pointer;">${link}</a>
            </td>
        </tr>
    </table>
    `
}
