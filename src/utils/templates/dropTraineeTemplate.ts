export default function DropTraineeTemplate(
  orgName: string | undefined,
  traineeName: string,
  reason: string,
  date: string
) {
  return /* html */ `
      <table style="font-size: 16px; font-family: 'Rubik', sans-serif; text-align: left; width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse;">
        <tbody>
          <tr>
            <td style="padding: 20px;">
              <p style="margin-bottom: 20px;">Dear ${traineeName},</p>
  
              <p style="margin-bottom: 15px;">
                We regret to inform you that you have been removed from the <strong>${orgName}</strong> organization.
              </p>
  
              <p style="margin-bottom: 15px;">
                <strong>Reason:</strong> ${reason}
              </p>
  
              <p style="margin-bottom: 15px;">
                <strong>Date:</strong> ${new Date(date).toLocaleDateString()}
              </p>
  
              <p style="margin-bottom: 15px;">
                We understand that this may come as a disappointment, and we encourage you to reach out if you have any questions or need further clarification.
              </p>
  
              <br /><br />
  
              <p style="margin-bottom: 10px;">Best regards,</p>
              <p style="margin-bottom: 0;">The ${orgName} Team</p>
            </td>
          </tr>
        </tbody>
      </table>`
}
