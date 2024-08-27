export default function Template({
  message,
  linkMessage,
  buttonText,
  link,
  closingText,
}: {
  message: string
  linkMessage?: string
  buttonText?: string
  link?: string
  closingText?: string
}) {
  return /* html */ `
      <table style="font-size: 16px; font-family: 'Rubik'; text-align: left">
        <tbody>
          <tr>
            <td>
              <p style="margin-bottom: 20px">Hello,</p>
              <br />

              <p style="margin-bottom: 10px">
                ${message}
              </p>
              ${
  link
    ? `<p style="margin-bottom: 5px">
                ${linkMessage || ''}
                </p>
                <a href="${link}" style="text-decoration: none; cursor: pointer">
                  <button
                      style="
                        font-size: 16px;
                        background-color: rgb(134, 103, 242);
                        font-family: 'Rubik';
                        text-align: center;
                        border: none;
                        border-radius: 3px;
                        padding: 5px;
                        cursor: pointer;
                        color: whitesmoke;
                      "
                  >
                    ${buttonText || 'click here'}
                  </button>
                </a>
                <br />
                <br />`
    : ''
}

              ${
  closingText
    ? `<p>${closingText}</p>`
    : '<p>If you think this email reached your inbox by mistake, simply ignore it.</p>'
}
              <br />
              <br />

              <p>Best Regard,</p>
              <p>Pulse team</p>
            </td>
          </tr>
        </tbody>
      </table>
    `
}
