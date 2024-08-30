export default function Template(link: string) {
  return `
            <table style="border-collapse: collapse; border: 1px solid #ccc; border-radius: 8px; max-width: 600px; margin: 0 auto; background-color: #ffff; overflow: hidden; width: 100%;">
          <tr>
              <td style="background-color: #E0E7FF; color: #5C31EF; padding: 12px; height: 60px; font-size: 18px; text-align: center;">
                  <img src="https://res.cloudinary.com/ddf0u9tgz/image/upload/v1725201316/perfomanceLogo_fptlz6.png" alt="Icon" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 8px;" />
                  <span>TTL Performance</span>
              </td>
          </tr>
          <tr>
              <td style="padding: 16px; font-size: 16px; font-family: 'Rubik', sans-serif; color: black; text-align: left;">
                  <p>Hello Lievin,</p>
                  <p>We hope you are doing well. Thank you for being with us the last four weeks. To help us improve, we’d like to ask you a few questions about your experience so far. It’ll take only 1-2 minutes, and your answers will help us to make this program even better for you and others.</p>
                  <p>Thanks,<br>DevPulse</p>
              </td>
          </tr>
          <tr>
              <td style="text-align: center; margin-top: 16px;">
                  <a href="${link}" style="text-decoration: none;">
                      <button style="font-size: 16px; background-color: #8667F2; font-family: 'Rubik', sans-serif; border: none; border-radius: 3px; padding: 10px 20px; cursor: pointer; color: #fff; margin-bottom: 16px;">Take Survey</button>
                  </a>
              </td>
          </tr>
      </table>
      `
}
