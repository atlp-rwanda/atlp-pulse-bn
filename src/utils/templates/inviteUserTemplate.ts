export default function Template(
    orgName: string,
    requesterEmail: string,
    requesterRole: string
) {
    return `
    <table style="text-align: left;">
    <tr>

      <td>

            <p style="font-size: 18px; font-family: 'Rubik';text-align: left;"> Hello, <p>

        <p style="font-size: 18px; font-family: 'Rubik';margin-top: 10px; line-height: 20px;">
          You have been invited to join DevPulse by <strong>${requesterRole}</strong> '<strong>${requesterEmail}</strong>' in organization <strong>'${orgName}'<strong>.
        </p>
        </br>
        <p style="font-size: 18px; font-family: 'Rubik'; margin-top: 10px">
           Best,
        </p>
        <p style="font-size: 18px; font-family: 'Rubik'">
           Team <strong>DevPulse</strong>,
        </p>
        <p style="font-size: 14px; font-family: 'Rubik'; margin-top: 10px">The link below will take you to the registration page where you can create an account</p>
        <br />
      </td>
    </tr>

  </table>
  `
}
