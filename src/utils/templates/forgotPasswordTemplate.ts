export default function Template(link: any, deepLink: string) {
  return /* html */ `
    <table style="font-size: 16px; font-family: 'Rubik'; text-align: left">
      <tbody>
        <tr>
          <td>
            <p style="margin-bottom: 10px">Hello,</p>
            <br />

            <p style="margin-bottom: 10px">
              You've requested a password reset for your Pulse account. To reset your password, click the button below.
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
                Reset Password (web)
              </button>
            </a>
            <br />
            <br />
            <a href="${deepLink}" style="text-decoration: none; cursor: pointer">
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
                Reset Password (Mobile)
              </button>
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
