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
      <style type="text/css">
          a:hover {
              text-decoration: underline !important;
          }
          * {
              margin-top: 0px;
          }
      </style>
  </head>
  <body style="margin: 0px; background-color: rgba(224, 231, 255, 0.51);">
      <!-- Wrapper Table -->
      <table
           max-width: 670px; margin: 0 auto; width: 100%;"
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
              <td style="height: 20px">&nbsp;</td>
          </tr>
          <tr>
              <td style="text-align: center; padding: 20px 16px;">
                  <h1 style="margin: 0; font-size: 24px; color: #333;">${title}</h1>
              </td>
          </tr>
          <!-- Content -->
          <tr>
              <td>
                  <table
                      style="
                      max-width: 670px; margin: 0 auto;
                     width: 100%;"
                      border="0"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                  >
                      <tr>
                          <td style="padding: 20px; text-align: center;">
                              <p>${message}</p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <!-- Spacer -->
          <tr>
              <td style="height: 20px">&nbsp;</td>
          </tr>
          <!-- Footer -->
          <tr>
              <td>
                  <table
                   width: 100%;"
                      border="0"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                  >
                      <tr>
                          <td style="padding: 15px; text-align: center;">
                              <p>If you have any questions, please contact us at <span style="color: blueviolet;">samuel.nishimwe@andela.com</span> or visit our FAQs.</p>
                          </td>
                      </tr>
                      <tr>
                          <td align="center" style="padding: 8px;">
                              <img src="https://res.cloudinary.com/ddf0u9tgz/image/upload/v1725015175/grayLogo_dwv7vd.png" alt="Logo" style="height: 30px; margin-right: 8px; vertical-align: middle;" />
                              <h1 style="margin: 0; font-size: 20px; color: #909090;">PULSE</h1>
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
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                      <td style="padding: 0 8px;">
                                          <a href="https://www.facebook.com/andela">
                                              <img src="https://toppng.com/uploads/preview/facebook-logo-svg-png-icon-free-download-facebook-icon-black-11562874203izuix8nneu.png" alt="Facebook" style="height: 24px; width: 24px;" />
                                          </a>
                                      </td>
                                      <td style="padding: 0 8px;">
                                          <a href="https://www.twitter.com/andela">
                                              <img src="https://img.freepik.com/premium-photo/twitter-logo-icon-illustration-vector_895118-5895.jpg" alt="Twitter" style="height: 24px; width: 24px;" />
                                          </a>
                                      </td>
                                      <td style="padding: 0 8px;">
                                          <a href="https://www.linkedin.com/company/andela">
                                              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1200px-LinkedIn_icon.svg.png" alt="LinkedIn" style="height: 24px; width: 24px;" />
                                          </a>
                                      </td>
                                      <td style="padding: 0 8px;">
                                          <a href="https://www.instagram.com/andela">
                                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHP2W0X8Bj9Wwou8Y5Iv2q_Aa-nME9SMwEAA&s" alt="Instagram" style="height: 24px; width: 24px;" />
                                          </a>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td style="height: 20px">&nbsp;</td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>
      `
}
