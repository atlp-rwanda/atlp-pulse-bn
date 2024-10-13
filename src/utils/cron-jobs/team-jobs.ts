import cron from 'node-cron';
import Team, { TeamInterface } from '../../models/team.model';
import { Attendance } from '../../models/attendance.model';
import { CohortInterface } from '../../models/cohort.model';
import { isSameWeek } from 'date-fns';

cron.schedule('*/20 * * * * *', async () => {
  // Schedule a job to add a new week on monday
  // cron.schedule('0 0 * * 1', async () => {
  try {
    console.log('in')
    const teams = await Team.find({ isJobActive: true, active: true }).populate('cohort');
    for (const team of teams) {
      const phase = team.phase || (team.cohort as CohortInterface).phase;
      const mainAttendances = await Attendance.find({
        phase,
        cohort: team.cohort
      });

      const attendances = await Attendance.find({
        phase,
        cohort: team.cohort,
        createdAt: {
          $gte: new Date(new Date().toISOString().split('T')[0] + 'T00:00:00Z'),
          $lt: new Date(new Date().toISOString().split('T')[0] + 'T23:59:59Z')
        }
      });

      if (!attendances.length && !mainAttendances.length) {
        await Attendance.create({
          week: 1,
          phase: phase,
          cohort: team.cohort,
          teams: [{
            team: team._id,
            trainees: []
          }]
        })
      } else {
        for (const attendance of attendances) {
          let teamWeeks = 0;
          const teamAttendanceData = attendance.teams.find(teamAttendance => (teamAttendance.team as TeamInterface)._id.equals(team._id));
          mainAttendances.forEach(async (mainTeamAttendance) => {
            if(mainTeamAttendance.week === 1) {
              if(!mainTeamAttendance.teams.find(teamAttendance => (teamAttendance.team as TeamInterface)._id.equals(team._id))) {
                teamWeeks++
              }
              await mainTeamAttendance.save()
            }
          });

          // search document to add the team 
          const tempAttendances = await Attendance.find({
            week: (teamWeeks + 1),
            phase,
            cohort: team.cohort,
          });
          if (tempAttendances) {
            attendance.teams.push({
              team: team.id,
              trainees: []
            })
            await attendance.save();
          }
        }
        if (mainAttendances.length && !attendances.length) {
          const weeks = [];
          const createdAtDates = [];
          for (const attendance of mainAttendances) {
            weeks.push(attendance.week)
            createdAtDates.push(attendance.createdAt)
          }
          createdAtDates.sort((a, b) => (a.getTime() - b.getTime()));
          weeks.sort((a, b) => (a - b));

          const newWeek = weeks[weeks.length - 1] + 1

          weeks.push(newWeek)
          const isInSameWeek = isSameWeek(
            new Date(),
            new Date(createdAtDates[createdAtDates.length - 1]),
            {
              weekStartsOn: 1
            }
          );

          if (!isInSameWeek) {
            await Attendance.create({
              week: newWeek,
              phase: phase,
              cohort: team.cohort,
              teams: [{
                team: team._id,
                trainees: []
              }]
            })
          }
        }
      }
    }
  } catch (error) {
    console.error('Error in scheduled job:', error);
  }
});