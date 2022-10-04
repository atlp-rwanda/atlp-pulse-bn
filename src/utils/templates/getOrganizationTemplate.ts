export default function Template(
    orgName: string,
) {
    return `
    <table style="text-align: left;">
    <tr>
       
      <td>
      
            <p style="font-size: 18px; font-family: 'Rubik';text-align: left;"> Hello, <p>
      
        <p style="font-size: 18px; font-family: 'Rubik';margin-top: 10px;line-height: 20px;">
          You have been added to organization <strong>${orgName}</strong>, you will now be using it to login.
        </p>
        </br>
        <p style="font-size: 18px; font-family: 'Rubik'; margin-top: 10px">
           Kudos!
        </p>
        <p style="font-size: 18px; font-family: 'Rubik'">
           Team <strong>DevPulse</strong>,
        </p>
        <p style="font-size: 14px; font-family: 'Rubik'; margin-top: 10px">The link below will take you to the login page</p>
        <br />
      </td>
    </tr>
   
  </table>
		`
}

