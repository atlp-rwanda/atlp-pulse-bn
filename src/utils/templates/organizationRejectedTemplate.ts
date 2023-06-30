export default function organizationRejectedTemplate(
  orgName: string,
) {
  return `
			<table style="text-align: left;">
			<tr>
				<td>
					<p style="font-size: 24px; font-weight: bold; font-family: 'Rubik';">
						Your organization ${orgName} was Rejected  you can reachout to Us.
					</p>
          <p style="font-size: 14px; font-family: 'Rubik'"">You can head over to the link below .</p>
          <br />
				</td>
			</tr>
       
		</table>
		`;
}
