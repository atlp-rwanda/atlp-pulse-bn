type Rating = {
  title: string
  percentage: number
}

export default function ratingEmailTemplate(
  recipientName: string,
  ratings: Rating[]
): string {
  const ratingsHtml = ratings
    .map(
      (rating) => `
          <div class="rating">
              <div class="rating-circle">${rating.percentage}%</div>
              <div class="rating-title">${rating.title}</div>
          </div>
      `
    )
    .join('')

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Monthly Ratings</title>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #ffffff;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
                  border: 2px solid #d1d5db;
              }
              .header {
                  background-color: #eef1ff;
                  padding: 20px;
                  text-align: center;
              }
              .header img {
                  width: 90px;
                  vertical-align: middle;
                  background-color: #eef1ff;
              }
              .header h1 {
                  display: inline-block;
                  font-size: 22px;
                  color: #6d6dc3;
                  margin-left: 10px;
                  vertical-align: middle;
              }
              .content {
                  padding: 20px;
                  text-align: left;
                  color: #333333;
              }
              .content p {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
              .rating-container {
                  display: flex;
                  justify-content: space-around;
                  margin-bottom: 20px;
                  width:100%
              }
              .rating {
                  text-align: center;
                  align-items:center;
                  justify-content:center;
                  margin:auto;
                  padding: 10px;
                  background-color: #f8f9fa;
                  width: 19%;
                  border-radius: 8px;
                  border: 2px solid #d1d5db;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  transition: transform 0.3s ease;
              }
  
              .rating:hover {
                  transform: scale(1.05);
                  background-color: #fefefe;
                  border: 2px solid #6d6dc3;
              }
  
              .rating-circle {
                  width: 80px;
                  height: 80px;
                  border: 5px solid #9747ff;
                  border-radius: 50%;
                  line-height: 70px;
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 10px;
              }
              .rating-title {
                  font-size: 14px;
                  color: #666666;
              }
              .feedback {
                  text-align: center;
                  font-weight: bold;
                  font-size: 18px;
                  margin-bottom: 20px;
              }
              .footer {
                  background-color: #f1f1f1;
                  padding: 20px;
                  text-align: center;
                  color: #909090;
                  font-size: 14px;
              }
              .footer p {
                  margin: 10px 0;
              }
              .footer a {
                  color: #6d6dc3;
                  text-decoration: none;
              }
              .footer .social-icons a {
                  margin: 0 10px;
                  font-size: 20px;
                  color: #909090;
              }
              .logo-container img {
                  height: 30px;
                  margin-right: 8px;
                  filter: brightness(0) saturate(100%) invert(69%) sepia(0%) saturate(0%) hue-rotate(184deg) brightness(92%) contrast(84%);
              }
          </style>
      </head>
      <body>
  
      <div class="container">
          <div class="header">
              <img src="https://res.cloudinary.com/dtrg22qjp/image/upload/v1724953851/Screenshot_2024-08-29_194958_stisjc.png"   alt="Document Icon">
              <h1>Monthly ratings</h1>
          </div>
          <div class="content">
              <p>Hello ${recipientName},</p>
              <p>We hope you are doing well. Thank you for being with us these last four weeks. This is your month's rating at Andela internal engagement.</p>
              <div class="rating-container">
                  ${ratingsHtml}
              </div>
              <div class="feedback">Overall feedback</div>
              <p>Lievin exhibits great commitment to the program. He has attended over 90% of all sessions and has made progress on his task.</p>
          </div>
  
      </div>
  
      </body>
      </html>
      `
}
