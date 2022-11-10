export default function Template(link: any) {
  return `
        <table style="text-align: left;">
        <tr>
          <td>
    
            <p style="font-size: 18px; font-family: 'Rubik';text-align: left;"> Hello, <p>
    
            <p style="font-size: 18px; font-family: 'Rubik';margin-top: 10px; line-height: 20px;">
              You can reset your password now
            </p>
            </br>
            <p style="font-size: 18px; font-family: 'Rubik'; margin-top: 10px">
            The link below will take you to a page where you can create your new password.<a href=${link}>Click here to processed with reset password</a>
            </p>
            <p style="font-size: 18px; font-family: 'Rubik'">
               Don't hestitate to enquire from us via email in case of any question an enquiries
            </p>
            <p style="font-size: 14px; font-family: 'Rubik'; margin-top: 10px">Team <strong>DevPulse</strong>, </p>
            <br />
          </td>
        </tr>
    
      </table>
      `;
}
