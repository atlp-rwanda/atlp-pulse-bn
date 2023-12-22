export default function generateTemplate({
  message,
  title = 'Notification Email',
}: {
  message: string
  title?: string
}) {
  return `
<!DOCTYPE html>
<html lang="en-US">
	<head>
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
		<title>${title}</title>
		<style type="text/css">
			a:hover {
				text-decoration: underline !important;
			}
			* {
				margin-top: 0px;
			}
		</style>
	</head>
	<body style="margin: 0px; background-color: #d3d3d3">
		<table
			style="background-color: #d3d3d3; max-width: 670px; margin: 0"
			width="100%"
			border="0"
			align="center"
			cellpadding="0"
			cellspacing="0"
			style="
				@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
				font-family: 'Open Sans', sans-serif;
			"
		>
			<tr>
				<td style="height: 20px">&nbsp;</td>
			</tr>
			<tr>
				<td style="text-align: center">
					<a href="${process.env.FRONTEND_LINK}" target="_blank">	
					</a>
				</td>
			</tr>
			<tr>
				<td style="height: 20px">&nbsp;</td>
			</tr>
			<tr>
				<td>
					<table
						border="0"
						align="center"
						cellpadding="0"
						cellspacing="0"
						style="
							max-width: 100%;
							margin-left: 0px;
							margin-right: 0px;
							background: #d3d3d3;
							border-radius: 3px;
							text-align: center;
							-webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
							-moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
							box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
						"
					>
						<tr>
							<td style="height: 20px">&nbsp;</td>
						</tr>
						<tr>
							<td style="padding-left: 20px; padding-right: 10px">${message}</td>
						</tr>
						<tr>
							<td style="height: 20px">&nbsp;</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td style="height: 20px">&nbsp;</td>
			</tr>
			<tr>
				<td style="height: 20px">&nbsp;</td>
			</tr>
		</table>
	</body>
</html>
`
}
