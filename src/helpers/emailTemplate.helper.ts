export default function generateTemplate({
  message,
  title = 'Notification Email',
}: {
  message: string
  title?: string
}) {
  return /* html */ `
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
				margin: 0px;
			}
		</style>
	</head>
	<body style="margin: 0px; background-color: #f2f3f8">
		<table
			style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
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
				<td style="height: 80px">&nbsp;</td>
			</tr>
			<tr>
				<td style="text-align: center">
					<a href="${process.env.FRONTEND_LINK}" target="_blank">
						<img src="${process.env.FRONTEND_LINK}/images/logo.png" />
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
							max-width: 670px;
							margin-left: 30px;
							margin-right: 30px;
							background: #fff;
							border-radius: 3px;
							text-align: center;
							-webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
							-moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
							box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
						"
					>
						<tr>
							<td style="height: 40px">&nbsp;</td>
						</tr>
						<tr>
							<td style="padding-left: 30px; padding-right: 30px">${message}</td>
						</tr>
						<tr>
							<td style="height: 40px">&nbsp;</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td style="height: 20px">&nbsp;</td>
			</tr>
			<tr>
				<td style="height: 80px">&nbsp;</td>
			</tr>
		</table>
	</body>
</html>
`
}
