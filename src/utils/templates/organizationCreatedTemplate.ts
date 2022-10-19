export default function organizationCreatedTemplate(
  orgName: string,
  email: string,
  password?: string
) {
  return `
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
							${
                password
                  ? `<tr>
									<td><p>Password:    </p></td>
									<td><p>${password}</p></td>
								</tr>
								`
                  : ''
              }

						</tbody>
					</table>
        </td>
      </tr>
		</table>
		`;
}
