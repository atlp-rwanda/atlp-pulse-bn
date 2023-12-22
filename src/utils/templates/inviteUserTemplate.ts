export default function Template(orgName: string, link: string) {
  return `
    <div style="font-size: 16px; font-family: 'Rubik'; margin-top: 0px; text-align: left; color: black">
    <div style="margin-top: 0px; color: black"> 
      <p><strong>From:</strong> devpulseadmn@gmail.com</p> 
      <p><strong>Subject:</strong> Invitation</p> 
      <p><strong>Invitation</strong></p> <br/>
      </div>
      <img src="${process.env.FRONTEND_LINK}/images/logo.png" />

      <br/><br/><br/>
      
      <p>Hello,</p> <br/>  

      <p>You have been invited to join a Pulse organization called <strong>${orgName}</strong>.</p>

      <p>The link below will take you to the registration page where you can create an account.</p>

      <a href="${link}" style="text-decoration: none; cursor: pointer">
        <button style="
          font-size: 16px;
          background-color: #d3d3d3;
          font-family: 'Rubik';
          text-align: center;
          border: none;
          border-radius: 3px;
          padding: 5px;
          cursor: pointer;
          color: #800080;
          text-decoration: underline;
        ">
          Join ${orgName}
        </button>
      </a>

      <br />
      <br />

      <p>If you did not initiate the request or you think this email reached your inbox by mistake, simply ignore it.</p>

      <br />
      <br />

      <p><strong>Best Regards,</strong></p>
      <p>Pulse team</p>
    </div>
  `
}
