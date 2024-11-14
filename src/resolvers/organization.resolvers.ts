/* eslint-disable prefer-const */
import { format } from 'date-fns'
import {
  checkUserLoggedIn,
} from '../helpers/user.helpers'
import { Organization } from '../models/organization.model'
import { RoleOfUser, User, UserInterface } from '../models/user'
import { Context } from './../context'

export type OrganizationType = InstanceType<typeof Organization>
export type UserType = InstanceType<typeof User>

interface RegistrationDataStatsInterface {
  month:
  | 'jan'
  | 'feb'
  | 'mar'
  | 'apr'
  | 'may'
  | 'jun'
  | 'jul'
  | 'aug'
  | 'sep'
  | 'oct'
  | 'nov'
  | 'dec'
  | null;
  users: number | null;
  organizations: number | null;
}

interface RegistrationDataInterface {
  year: number;
  stats: RegistrationDataStatsInterface[];
}
const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

const calcYearRegData = (usersOrgsData: any, yearsRegData: RegistrationDataInterface[], isUsers: boolean) => {
  for (const userOrg of usersOrgsData) {
    if (userOrg.createdAt) {
      const initialMonthsData: RegistrationDataStatsInterface[] = months.map((month) => ({
        month: month as RegistrationDataStatsInterface['month'],
        users: null,
        organizations: null,
      }));

      const createdAt = new Date(userOrg.createdAt)
      const regYear = createdAt.getFullYear();
      const regMonthNum = createdAt.getMonth();
      const regMonth = format(createdAt, 'MMM').toLowerCase() as RegistrationDataStatsInterface['month'];

      const yearIndex = yearsRegData.findIndex(year => year.year === regYear);

      if (yearIndex !== -1) {
        const statMonthIndex = yearsRegData[yearIndex].stats.findIndex((month: { month: string | null }) => month.month === regMonth);
        if (statMonthIndex !== -1) {
          const tempValue = isUsers ? yearsRegData[yearIndex].stats[statMonthIndex].users : yearsRegData[yearIndex].stats[statMonthIndex].organizations;
          if (isUsers) {
            yearsRegData[yearIndex].stats[statMonthIndex].users = (tempValue && tempValue > 0) ? tempValue + 1 : 1;
          } else {
            yearsRegData[yearIndex].stats[statMonthIndex].organizations = (tempValue && tempValue > 0) ? tempValue + 1 : 1
          }
        } else {
          const statMonthIndex2 = initialMonthsData.findIndex(month => month.month === regMonth);
          initialMonthsData[statMonthIndex2] = { month: regMonth, users: isUsers ? 1 : null, organizations: !isUsers ? 1 : null }
          initialMonthsData.forEach(monthData => {
            const monthIndex = months.findIndex((month) => monthData.month === month);
            if (monthIndex !== -1 && monthIndex < regMonthNum) {
              monthData.users = (monthData.users != null && monthData.users >= 0) ? monthData.users : 0
              monthData.organizations = (monthData.organizations != null && monthData.organizations >= 0) ? monthData.organizations : 0
            }
          })
          yearsRegData[yearIndex].stats = initialMonthsData;
        }
      } else {
        const statMonthIndex = initialMonthsData.findIndex(month => month.month === regMonth);
        if (statMonthIndex !== -1) {
          initialMonthsData[statMonthIndex] = { month: regMonth, users: isUsers ? 1 : null, organizations: !isUsers ? 1 : null }
          initialMonthsData.forEach(monthData => {
            const monthIndex = months.findIndex((month) => monthData.month === month);
            if (monthIndex !== -1 && monthIndex < regMonthNum) {
              monthData.users = 0
              monthData.organizations = 0
            }
          })
          yearsRegData.push({
            year: regYear,
            stats: [...initialMonthsData],
          });
        }
      }
    }
  }
  return yearsRegData
};

const resolvers: any = {
  Query: {
    async getAllOrgUsers(_: any, __: any, context: Context) {
      ; (await checkUserLoggedIn(context))([RoleOfUser.SUPER_ADMIN]);

      const totalUsers = await User.countDocuments();
      const allOrgUsers = {
        totalUsers: totalUsers,
        organizations: [] as any[]
      }

      const orgs = await Organization.find({ status: 'active' });

      for (const org of orgs) {
        const orgUsers = await User.find({ organizations: org.name });

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date();
        endOfMonth.setMonth(startOfMonth.getMonth() + 1);
        endOfMonth.setDate(0);
        endOfMonth.setHours(23, 59, 59, 999);

        const monthlyRegistrations = await User.countDocuments({
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
          organizations: org.name
        });

        const recentLogin = org.logins.find((count) => {
          return count.date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]
        })
        const result = {
          organization: org,
          members: orgUsers,
          loginsCount: recentLogin?.loginsCount || 0,
          recentLocation: recentLogin?.recentLocation,
          monthPercentage: orgUsers.length > 0 ? (monthlyRegistrations / orgUsers.length) * 100 : 0
        }
        allOrgUsers.organizations.push(result);
      }

      return allOrgUsers
    },
    async getRegistrationStats(_: any, __: any, context: Context) {
      ; (await checkUserLoggedIn(context))([RoleOfUser.SUPER_ADMIN]);

      const months = [
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'jun',
        'jul',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec',
      ];

      const monthsData: any = [];
      let yearsRegData: RegistrationDataInterface[] = [{
        year: new Date().getFullYear(),
        stats: monthsData
      }];

      const users = await User.find();
      yearsRegData = calcYearRegData(users, yearsRegData, true);

      const organizations = await Organization.find();
      yearsRegData = calcYearRegData(organizations, yearsRegData, false);

      return yearsRegData
    }
  },
}
export default resolvers
