const suspiciousActivityTemplate = (trials: number, date: Date, country?: string, city?: string) => {
    return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Suspicious Activity Detected</title>
      <style>
          body {
              background-color: #f5f5f5;
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
          }
  
          .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 4px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
              color: #333333;
              font-size: 24px;
              margin: 0;
          }
  
          p {
              color: #666666;
              font-size: 16px;
              line-height: 1.6;
              margin: 10px 0;
          }
  
          .cta-button {
              display: inline-block;
              margin-top: 20px;
              background-color: #4caf50;
              color: #ffffff;
              font-size: 16px;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 4px;
          }
  
          .cta-button:hover {
              background-color: #45a049;
          }
          #det{
            display:grid;
            padding: 10% 5%;
            border: 2px solid red;
  
          }
          li{
            margin:2% 0%;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Suspicious Activity Detected</h1>
          <p>We have detected some suspicious activity on your account. For your security, we recommend taking immediate action to ensure the safety of your account.</p>
          <p>If you believe this activity was unauthorized, please click the button below to reset your password:</p>
          <a class="cta-button" href="${process.env.FRONTEND_LINK}/reset-password">Reset Password</a>
          <div id="det">
  
          <li>date:${date.toString()}</li>
          <li>country name: ${country || "unknown"}</li>
          <li>city: ${city || "unknown"}</li>
          <li>failed attempts:${trials}</li>
          </div>
  
  
          <p>If you recognize this activity and believe it was performed by you, you can safely ignore this message.</p>
          <p>If you have any questions or need further assistance, please contact our support team.</p>
          <p>Best regards,</p>
          <p>Pulse Team</p>
      </div>
  </body>
  </html>
  `
  }

  export default suspiciousActivityTemplate