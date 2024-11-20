const link = process.env.FRONTEND_LINK + '/login/org'

export default function Template(email:string,password:string,orgName:string) {
  return /* html */ `
    <table style="font-size: 16px; font-family: 'Rubik'; text-align: left">
      <tbody>
        <tr>
          <td>
            <br />
            <p style="margin-bottom: 5px">
              Welcome to <strong>${orgName}</strong> organization, Below are your login details:<br>
              You have signed up with email: <strong>${email}</strong>, and password: <strong>${password}</strong>. <br>
              You will now use it  to login from here on.
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
