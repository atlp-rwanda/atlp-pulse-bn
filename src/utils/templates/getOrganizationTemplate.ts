const link = process.env.FRONTEND_LINK + '/login/org'

export default function Template(orgName: string, link: string) {
  return /* html */ `
    <table style="font-size: 16px; font-family: 'Rubik'; text-align: left">
      <tbody>
        <tr>
          <td>
            <p style="margin-bottom: 10px">Hello,</p>
            <br />

            <p style="margin-bottom: 5px">
              You have been added to the <strong>${orgName}</strong> organization. You will now use it to login from here on.
            </p>
            <p style="margin-bottom: 10px">
              Use the button below to login into the organization.
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
                Login
              </button>
            </a>
            <br />
            <br />

            <p>
              If you think this email reached your inbox by mistake, simply ignore it.
            </p>
            <br />
            <br />

            <p>Best Regard,</p>
            <p>Pulse team</p>
          </td>
        </tr>
      </tbody>
    </table>`
}
