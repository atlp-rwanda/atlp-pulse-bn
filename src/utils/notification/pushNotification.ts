import {
  Expo,
  ExpoPushErrorReceipt,
  ExpoPushMessage,
  ExpoPushReceipt,
  ExpoPushTicket,
} from 'expo-server-sdk'
import mongoose from 'mongoose'
import { Notification } from '../../models/notification.model'
import { Profile } from '../../models/profile.model'
import { User } from '../../models/user'
import { pubSubPublish } from '../../resolvers/notification.resolvers'

export type NotificationData = {
  redirectURI?: string
  criteria: {
    type: 'PUBLIC' | 'PERSONAL' | 'TEAM' | 'ORGANIZATION'
    value: string
  }
}

let expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
})

export const pushNotification = async (
  receiver: mongoose.Types.ObjectId,
  message: string,
  sender: mongoose.Types.ObjectId,
  type?:
    | 'rating'
    | 'performance'
    | 'ticket'
    | 'trainee'
    | 'attendance'
    | 'team'
    | 'cohort'
) => {
  const notification = await Notification.create({
    receiver: receiver,
    message: message,
    sender: sender,
    type,
  })
  const profile = await Profile.findOne({ user: notification.sender })
  const sanitizedNotification = {
    ...notification.toObject(),
    id: notification.id,
    sender: { profile: profile?.toObject() },
  }
  const receivingUser = await User.findOne({ _id: receiver })
  if (receivingUser && receivingUser.pushNotifications) {
    pubSubPublish(sanitizedNotification)

    if (receivingUser.pushNotificationTokens.length > 0) {
      const notificationData: NotificationData = {
        redirectURI: `/dashboard/trainee${
          notification.type ? '/' + notification.type : ''
        }`,
        criteria: { type: 'PERSONAL', value: receivingUser.id },
      }

      console.log('Sending push notifications')

      sendPushNotifications(
        receivingUser.pushNotificationTokens,
        `${capitalizeString(notification.type)} notification`,
        notification.message,
        notificationData
      )
    }
  }
}

const capitalizeString = (str?: string) => {
  str = str || 'New'
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const sendPushNotifications = async (
  pushTokens: string[],
  title: string,
  body: string,
  data: NotificationData
) => {
  // Create the messages that you want to send to clients
  let messages: ExpoPushMessage[] = []
  for (let pushToken of pushTokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`)
      continue
    }

    messages.push({
      to: pushToken,
      title: title,
      body: body,
      data: data,
    })
  }

  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications.
  let chunks = expo.chunkPushNotifications(messages)
  let tickets: ExpoPushTicket[] = []
  ;(async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk)
        console.log(ticketChunk)
        tickets.push(...ticketChunk)
      } catch (error) {
        console.error(error)
      }
    }
  })()

  let receiptIds = []
  for (let ticket of tickets) {
    // NOTE: Not all tickets have IDs; for example, tickets for notifications
    // that could not be enqueued will have error information and no receipt ID.
    if (ticket.status === 'ok') {
      receiptIds.push(ticket.id)
    }

    if (ticket.status === 'error' && ticket.details) {
      console.error(ticket.details.error)
    }
  }

  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds)
  ;(async () => {
    // Like sending notifications, there are different strategies you could use
    // to retrieve batches of receipts from the Expo service.
    for (let chunk of receiptIdChunks) {
      try {
        let receipts = await expo.getPushNotificationReceiptsAsync(chunk)
        console.log(receipts)

        // The receipts specify whether Apple or Google successfully received the
        // notification and information about an error, if one occurred.
        for (let receiptId in receipts) {
          let { status, details }: ExpoPushReceipt | ExpoPushErrorReceipt =
            receipts[receiptId]
          if (status === 'ok') {
            continue
          } else if (status === 'error') {
            console.error(
              `There was an error sending a notification: ${details}`
            )
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  })()
}
