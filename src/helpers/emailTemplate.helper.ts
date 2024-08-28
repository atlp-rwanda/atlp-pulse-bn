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
        body {
            font-family: 'Open Sans', sans-serif;
            background-color: #d3d3d3;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 670px;
            margin: 0 auto;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
            overflow: hidden;
        }
        .header, .footer {
            padding: 15px;
            text-align: center;
        }
        .footer {
            background-color: #f1f1f1;
        }
        .footer-content {
            width: 100%;
            margin: 0 auto;
        }
        .footer p {
            font-size: 10px;
            color: #000;
            margin: 3px 0;
        }
        .footer .contact {
            color: blueviolet;
        }
        .logo-container img {
            height: 30px;
            margin-right: 8px;
            filter: brightness(0) saturate(100%) invert(69%) sepia(0%) saturate(0%) hue-rotate(184deg) brightness(92%) contrast(84%);
        }
        .social-icons a {
            margin: 0 8px;
            font-size: 20px;
            color: #000;
			text-decoration: none;
        }
        .social-icons img {
            height: 24px;
            width: 24px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${title}</h1>
        </div>
        <div class="content">
            <p style="padding: 20px;">${message}</p>
        </div>
        <div class="footer">
            <p>If you have any questions, please contact us at <span class="contact">samuel.nishimwe@andela.com</span> or visit our FAQs.</p>
            <table class="footer-content" role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                    <td align="center" style="padding: 8px;">
                        <div style="display: inline-block; vertical-align: middle;">
                            <img src="${process.env.FRONTEND_LINK}/public/images/logo.png" alt="Logo" style="height: 30px; margin-right: 8px; vertical-align: middle;" />
                        </div>
                        <div style="display: inline-block; vertical-align: middle;">
                            <h1 style="margin: 0; font-size: 20px; color: #909090; display: inline-block;">PULSE</h1>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 8px;">
                        <a href="${process.env.FRONTEND_LINK}/unsubscribe" style="color: #909090; font-size: 14px;">Unsubscribe</a>
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 8px;">
                        <p style="font-size: 14px; color: #909090;">Andela Rwanda, 1 KN 78 St, Kigali</p>
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 8px;">
                        <div class="social-icons">
                            <a href="https://www.facebook.com/andela">
                                <img src="https://toppng.com/uploads/preview/facebook-logo-svg-png-icon-free-download-facebook-icon-black-11562874203izuix8nneu.png" alt="Facebook" />
                            </a>
                            <a href="https://www.twitter.com/andela">
                                <img src="https://img.freepik.com/premium-photo/twitter-logo-icon-illustration-vector_895118-5895.jpg" alt="Twitter" />
                            </a>
                            <a href="https://www.linkedin.com/company/andela">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1200px-LinkedIn_icon.svg.png" alt="LinkedIn" />
                            </a>
                            <a href="https://www.instagram.com/andela">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHP2W0X8Bj9Wwou8Y5Iv2q_Aa-nME9SMwEAA&s" alt="Instagram" />
                            </a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>

	`
}
