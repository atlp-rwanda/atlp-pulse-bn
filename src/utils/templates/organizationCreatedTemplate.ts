export default function organizationCreatedTemplate(
  orgName: string,
  email: string,
  password?: string
) {
  return /* html */ `
			<table style="text-align: left;">
			<tr>
				<td>
					<p style="font-size: 24px; font-weight: bold; font-family: 'Rubik';">
						Your organization ${orgName} was created successfully.
					</p>
          <p style="font-size: 14px; font-family: 'Rubik'"">You can head over to the link below to login.</p>
          <br />
				</td>
			</tr>
      <tr>
        <td>
					<table>
						<tbody>
							<th><p style=" font-weight;font-family: 'Rubik'">Your admin credentials: </p></th>
							<tr>
								<td><p>Email:    </p></td>
								<td><p>${email}</p></td>
							</tr>
				<tr>
									<td><p>Password:    </p></td>
									<td><p>${password}</p></td>

								</tr>

								<td>

								<p style="font-size: 14px; font-family: 'Rubik'; margin-top: 5px">The link below will take you to the login page</p>
								<br />
								<a href="${process.env.FRONTEND_LINK}/login/org" style="text-decoration: none; cursor: pointer">
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
										Login organization
									</button>
								</a>
								</td>
								<tr>

						</tbody>
					</table>
        </td>
      </tr>
		</table>
		`
}
