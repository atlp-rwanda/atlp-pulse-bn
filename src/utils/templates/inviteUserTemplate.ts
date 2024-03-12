export default function Template(orgName: string, link: string) {
  return /* html */ `
    <table style="font-size: 16px; font-family: 'Rubik'; text-align: left">
      <tbody>
        <tr>
          <td>
            <p style="margin-bottom: 20px">Hello,</p>
            <br />

            <p style="margin-bottom: 5px">
              You have been invited to join a Pulse organization called
              <strong>${orgName}</strong>.
            </p>
            <p style="margin-bottom: 10px">
              The link below will take you to the registration page where you can create
              an account.
            </p>

            <a href="${link}" style="text-decoration: none; cursor: pointer">
              <button
                style="
                  font-size: 16px;
                  background-color: rgb(134, 103, 242);
                  font-family: 'Rubik';
                  text-align: center;
                  border: none;
                  border-radius: 3px;
                  padding: 5px;
                  cursor: pointer;
                  color: whitesmoke;
                "
              >
                Join ${orgName}
              </button>
              <p>If the button is not functional, copy and paste the link below: </p>
              ${link}
            </a>
            <br />
            <br />

            <p>
              If you did not initiate the request or you think this email reached your
              inbox by mistake, simply ignore it.
            </p>
            <br />
            <br />

            <p>Best Regard,</p>
            <p>Pulse team</p>
          </td>
        </tr>
      </tbody>
    </table>
  `
}
