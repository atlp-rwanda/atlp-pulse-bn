import { Notification } from '../models/notification.model';

const seedNotification = async () => {
  await Notification.deleteMany({});

  return null;
};

export default seedNotification;
