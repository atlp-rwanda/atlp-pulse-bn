import { format } from 'date-fns'

export function eventInvitationTemplate(
  eventTitle: string,
  hostName: string,
  eventStart: string,
  eventEnd: string,
  eventTimeToStart: string,
  eventTimeToEnd: string,
  acceptedEventToken: string,
  declinedEventToken: string
): string {
  const acceptedResponseLink = `${process.env.FRONTEND_LINK}/calendar/confirm?eventToken=${acceptedEventToken}`
  const declinedResponseLink = `${process.env.FRONTEND_LINK}/calendar/confirm?eventToken=${declinedEventToken}`
  return `
      <table style="font-size: 16px; font-family: 'Rubik', sans-serif; text-align: left; width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse;">
        <tbody>
          <tr>
            <td style="padding: 20px 0px; backgound-color: yellow;">
              <p style="margin-bottom: 20px;">Hello,</p>
  
              <p style="margin-bottom: 15px;">
                You have been invited to an event <strong>${eventTitle}</strong> hosted by <strong>${hostName}</strong> that will occur from <strong>${format(
    new Date(eventStart),
    'yyyy-MM-dd'
  )}</strong> to <strong>${format(new Date(eventEnd), 'yyyy-MM-dd')}</strong>.
                This event will take place daily from <strong>${eventTimeToStart}</strong> to <strong>${eventTimeToEnd}</strong>. We look forward to your participation.
              </p>

              <p style="margin-bottom: 15px;">
                Please confirm your availability.
              </p>
                <a href="${acceptedResponseLink}" target="_blank" style="display: inline-block; font-size: 14px; background-color: #8667F2; font-family: 'Rubik', sans-serif; text-align: center; border: none; border-radius: 3px; padding: 10px 20px; margin-right:20px; color: #fff; text-decoration: none;">
                    Accept
                </a>
                <a href="${declinedResponseLink}" target="_blank" style="display: inline-block; font-size: 14px; background-color: #9fa2a6; font-family: 'Rubik', sans-serif; text-align: center; border: none; border-radius: 3px; padding: 10px 20px; margin-right:20px; color: #fff; text-decoration: none;">
                    Decline
                </a>
              <p style="margin: 15px 0px;">
                If you think this email reached your inbox by mistake, simply ignore it.
              </p>

              <p>Best Regards,</p>
              <p>Pulse Team</p>
            </td>
          </tr>
        </tbody>
      </table>`
}

export function eventUpdateTemplate(
  eventTitle: string,
  hostName: string,
  eventStart: string,
  eventEnd: string,
  eventTimeToStart: string,
  eventTimeToEnd: string
): string {
  return `
      <table style="font-size: 16px; font-family: 'Rubik', sans-serif; text-align: left; width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse;">
        <tbody>
          <tr>
            <td style="padding: 20px 0px; backgound-color: yellow;">
              <p style="margin-bottom: 20px;">Hello,</p>
  
              <p style="margin-bottom: 15px;">
                The Event has been updated to <strong>${eventTitle}</strong> hosted by <strong>${hostName}.</strong> It will occur from <strong>${format(
    new Date(eventStart),
    'yyyy-MM-dd'
  )}</strong> to <strong>${format(new Date(eventEnd), 'yyyy-MM-dd')}</strong>.
                The event will take place daily from <strong>${eventTimeToStart}</strong> to <strong>${eventTimeToEnd}</strong>. Thank you for your understanding
              </p>
              <p style="margin: 15px 0px;">
                If you think this email reached your inbox by mistake, simply ignore it.
              </p>

              <p>Best Regards,</p>
              <p>Pulse Team</p>
            </td>
          </tr>
        </tbody>
      </table>`
}

export function eventCancellationTemplate(eventTitle: string): string {
  return `
      <table style="font-size: 16px; font-family: 'Rubik', sans-serif; text-align: left; width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse;">
        <tbody>
          <tr>
            <td style="padding: 20px;">
              <p style="margin-bottom: 20px;">Hello,</p>
  
              <p style="margin-bottom: 15px;">
                Event <strong>${eventTitle}</strong> has been cancelled.
              </p>
  
            </td>
          </tr>
        </tbody>
      </table>`
}

export function invitationCancellationTemplate(eventTitle: string): string {
  return `
      <table style="font-size: 16px; font-family: 'Rubik', sans-serif; text-align: left; width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse;">
        <tbody>
          <tr>
            <td style="padding: 20px;">
              <p style="margin-bottom: 20px;">Hello,</p>
  
              <p style="margin-bottom: 15px;">
                Your invitation to event <strong>${eventTitle}</strong> has been cancelled.
              </p>
  
            </td>
          </tr>
        </tbody>
      </table>`
}