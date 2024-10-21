import { WeekdaysInterface } from '../resolvers/attendance.resolvers';

const handleAttendanceDay = (dayDate: string) => {
  const today = new Date();
  const input = new Date(dayDate);

  today.setHours(0, 0, 0, 0);
  input.setHours(0, 0, 0, 0);

  const previousDay = new Date(today);
  previousDay.setDate(today.getDate() - 1);

  if (input.getTime() === today.getTime()) {
    return true;
  }

  if (input.getTime() === previousDay.getTime()) {
    return true;
  }

  // Check if today is Monday  and selectedDayDate is last Friday
  if (today.getDay() === 1 && input.getDay() === 5) {
    const lastFriday = new Date(today);
    lastFriday.setDate(today.getDate() - 3);

    return input.getTime() === lastFriday.getTime();
  }

  return false;
};

const days: ('mon' | 'tue' | 'wed' | 'thu' | 'fri')[] = ['mon', 'tue', 'wed', 'thu', 'fri'];

export const getDateForDays = (inputDate: string) => {
  try {
    const date = new Date(Number(inputDate));
    let dayOfWeek = date.getDay();

    if (date.getUTCHours() >= 22) {
      date.setUTCDate(date.getUTCDate() + 1);
      date.setUTCHours(0, 0, 0, 0); // Set the time to midnight of the next day
    }

    if (dayOfWeek === 0) {
      dayOfWeek = 7
    }
    const dateObj: WeekdaysInterface = {
      mon: { date: '', isValid: false },
      tue: { date: '', isValid: false },
      wed: { date: '', isValid: false },
      thu: { date: '', isValid: false },
      fri: { date: '', isValid: false }
    };

    for (let i = 1; i <= 5; i++) {
      const daysToAdd = i - dayOfWeek;
      const weekdayDate = new Date(date);
      weekdayDate.setDate(date.getDate() + daysToAdd);

      dateObj[days[i - 1]].date = weekdayDate.toISOString().split('T')[0];
      dateObj[days[i - 1]].isValid = handleAttendanceDay(weekdayDate.toISOString())
    }

    return dateObj;
  } catch (error) {
    return {
      mon: { date: '', isValid: false },
      tue: { date: '', isValid: false },
      wed: { date: '', isValid: false },
      thu: { date: '', isValid: false },
      fri: { date: '', isValid: false }
    }
  }

};


