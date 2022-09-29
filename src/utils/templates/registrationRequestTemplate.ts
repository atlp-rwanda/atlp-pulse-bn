export default function registrationRequest(
    email: string,
    name: string,
    description: string
) {
    return `
			<table>
			<tr>
				<td>
					<p style="font-size: 24px; font-family: 'Rubik'">
						A user with email: ${email} requested an organization.
					</p>
				</td>
			</tr>
			<tr>
				<td><p style="font-size: 16px; font-weight: bold; font-family: 'Rubik'">Details:</p></td>
			</tr>
			<tr>
				<td>
					<table style="text-align: left; margin: auto">
						<tr>
							<td style="width: 20px"></td>
							<td style="vertical-align: top">User Email:</td>
							<td>${email}</td>
						</tr>
						<tr>
							<td style="width: 20px"></td>
							<td style="vertical-align: top">Organization Name:</td>
							<td>${name}</td>
						</tr>
						<tr>
							<td style="width: 20px"></td>
							<td style="vertical-align: top">Organization Description:</td>
							<td style="word-break: break-word">
								${description}
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		`
}
