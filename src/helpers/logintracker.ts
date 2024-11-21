import { User } from '../models/user'
import { sendEmail } from '../utils/sendEmail'

export const checkloginAttepmts = async (Profile: any, user: any) => {
  try {
    const profile = await Profile.findOne({ user })

    if(!profile || !profile.activity){
      return;
    }
    const { activity } = profile

    if (activity && activity?.length > 1) {
      const inline = activity[activity.length - 1]
      const recent = Number(inline.failed) + 1 || 0
      if (
        recent >= 3 ||
        inline.country_name != activity[activity.length - 2].country_name
      ) {
        await sendEmail(
          user.email,
          'ALERT!: Unusual Activity Detected on Your Account!',
          emailtemp(recent, inline.date, inline.country_name, inline.city),
          '',
          process.env.COORDINATOR_EMAIL,
          process.env.COORDINATOR_PASS
        )
      }
      return recent
    }
  } catch (error) {
    console.log(error)
  }

  return 1
}

export async function checkUserAccountStatus(
  userId: string
): Promise<boolean | 'active' | 'drop' | 'suspended' | any> {
  const user = await User.findById(userId)
  if (!user) {
    return false
  }
  return user?.status?.status
}

const emailtemp = (trials: any, date: any, country: any, city: any) => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Suspicious Activity Detected</title>
      <style>
          body {
              background-color: #f9f9f9;
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
          }
  
          .container {
              max-width: 600px;
              margin: 30px auto;
              background-color: #ffffff;
              padding: 20px 30px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
              color: #2c3e50;
              font-size: 22px;
              margin-bottom: 10px;
          }
  
          p {
              color: #7f8c8d;
              font-size: 15px;
              line-height: 1.6;
          }
  
          .details-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 15px;
          }
  
          .details-table th,
          .details-table td {
              text-align: left;
              padding: 10px;
              border-bottom: 1px solid #ecf0f1;
          }
  
          .details-table th {
              background-color: #f4f6f7;
              color: #34495e;
              font-weight: bold;
          }
  
          .cta-button {
            display: inline-block;
            margin-top: 20px;
            background-color: #6a1b9a; /* Deep purple */
            color: white;
            font-size: 16px;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 6px;
            transition: background-color 0.3s ease;
          }
  
        .cta-button:hover {
            background-color: #4a148c; /* Darker shade of purple for hover effect */
        }
  
  
          .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #bdc3c7;
              text-align: center;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <p>We have noticed unusual failed login attempts on your account. To secure your account, we recommend resetting your password immediately.</p>
          <a class="cta-button" 
            style="color: white !important; background-color: #6a1b9a; padding: 12px 25px; 
                    font-size: 16px; border-radius: 6px; text-decoration: none;" 
            href="${process.env.FRONTEND_LINK}/reset-password">
            Reset Password
          </a>
  
          <table class="details-table">
              <thead>
                  <tr>
                      <th>Details</th>
                      <th>Information</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Date</td>
                      <td>${date}</td>
                  </tr>
                  <tr>
                      <td>Country</td>
                      <td>${country}</td>
                  </tr>
                  <tr>
                      <td>City</td>
                      <td>${city}</td>
                  </tr>
                  <tr>
                      <td>Failed Attempts</td>
                      <td>${trials}</td>
                  </tr>
              </tbody>
          </table>
          <p>If this activity was initiated by you, no further action is required.</p>
          <p>Best regards,</p>
          <p>Pulse Team</p>
          <div class="footer">Your security is our priority. Contact support if you need assistance.</div>
      </div>
  </body>
  </html>`;
}
