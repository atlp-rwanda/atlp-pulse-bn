import { sendEmail } from "../utils/sendEmail"
import { eventCancellationTemplate, eventInvitationTemplate, invitationCancellationTemplate } from "../utils/templates/eventInvitationTemplates";

export async function sendEventInvitations(
    email: string,
    eventId: string,
    eventTitle: string,
    hostName: string,
    eventStart: string,
    eventEnd: string,
    eventTimeToStart: string,
    eventTimeToEnd: string,
){
    try{
        const content: string = eventInvitationTemplate(eventId,eventTitle,hostName,eventStart,eventEnd,eventTimeToStart,eventTimeToEnd)
        await sendEmail(
            email,
            'Event Invitation',
            content,
            null,
            process.env.ADMIN_EMAIL,
            process.env.ADMIN_PASS,
        )
    }catch(err){
        return err
    }
}

export async function sendEventCancellations(
    email: string,
    eventTitle: string,
){
    try{
        const content: string = eventCancellationTemplate(eventTitle)
        await sendEmail(
            email,
            'Event Cancelled',
            content,
            null,
            process.env.ADMIN_EMAIL,
            process.env.ADMIN_PASS,
        )
    }catch(err){
        return err
    }
}

export async function sendInvitationCancellations(
    email: string,
    eventTitle: string,
){
    try{
        const content: string = invitationCancellationTemplate(eventTitle)
        await sendEmail(
            email,
            'Invitation Cancelled',
            content,
            null,
            process.env.ADMIN_EMAIL,
            process.env.ADMIN_PASS,
        )
    }catch(err){
        return err
    }
}