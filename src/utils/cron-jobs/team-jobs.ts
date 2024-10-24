import cron from 'node-cron';
import Team from '../../models/team.model';
import { Attendance } from '../../models/attendance.model';
import Cohort, { CohortInterface } from '../../models/cohort.model';
import { isSameWeek } from 'date-fns';
import mongoose from 'mongoose';

export const addNewAttendanceWeek = async () => {
  try {
    const completedTeamsId: string[] = [];
    const cohorts = await Cohort.find({ active: true });
    for (const cohort of cohorts) {
      const attendances = await Attendance.find({ cohort: cohort._id, phase: cohort.phase });
      if (!attendances.length) {
        const teams = await Team.find({ cohort, active: true, isJobActive: true });
        await Attendance.create({
          week: 1,
          phase: cohort.phase,
          cohort: cohort,
          teams: teams.map(team => {
            const phase = (team.phase as mongoose.Types.ObjectId);
            if (phase && phase.equals(cohort.phase.toString())) {
              completedTeamsId.push(team._id.toString());
              return { team, trainees: [] };
            }
            if (!phase) {
              completedTeamsId.push(team._id.toString());
              return { team, trainees: [] };
            }
          }).filter(team => team)
        })
      }
    }

    const teams = await Team.find({ active: true, isJobActive: true }).populate('cohort');

    for (const team of teams) {
      const phase = team.phase || (team.cohort as CohortInterface).phase
      const attendances = await Attendance.find({ cohort: (team.cohort as CohortInterface)._id, phase: phase });

      let lastWeek = 0;
      let attendanceIndex: number | undefined;
      let teamAttendanceDate;
      for (let index = 0; index < attendances.length; index++) {
        const attendance = attendances[index];
        if (attendance.week > lastWeek) {
          for (const teamAttendance of attendance.teams) {
            if (team._id.equals(teamAttendance.team)) {
              lastWeek = attendance.week
              attendanceIndex = index;
              teamAttendanceDate = teamAttendance.date;
            }
          }
        }
      }

      if (lastWeek && lastWeek < 43 && teamAttendanceDate && (attendanceIndex! >= 0)) {

        const isInSameWeek = isSameWeek(
          new Date(),
          new Date(teamAttendanceDate),
          {
            weekStartsOn: 1
          }
        );
        if (!isInSameWeek && (new Date().getTime() > new Date(teamAttendanceDate).getTime())) {
          const attendanceExist = await Attendance.findOne({ week: (lastWeek + 1), phase: phase, cohort: (team.cohort as CohortInterface)._id })
          if (attendanceExist) {
            completedTeamsId.push(team._id.toString());
            attendanceExist.teams.push({
              team: team._id,
              trainees: []
            })
            await attendanceExist.save()
          } else {
            const tempTeams = await Team.find({ active: true, isJobActive: true, cohort: (team.cohort as CohortInterface)._id }).populate('cohort')
            await Attendance.create({
              week: (lastWeek + 1),
              phase,
              cohort: (team.cohort as CohortInterface)._id,
              teams: tempTeams.map(team => {
                if (!completedTeamsId.includes(team._id.toString()) && team.phase && (team.phase as mongoose.Types.ObjectId).equals(phase.toString())) {
                  return { team, trainees: [] };
                }
                if (!completedTeamsId.includes(team._id.toString())) {
                  return { team, trainees: [] };
                }
              }).filter(team => team)
            })
          }
        }
      }
      if (attendances.length && attendanceIndex === undefined) {
        const tempAttendance = await Attendance.findOne({ week: (lastWeek + 1), phase, cohort: (team.cohort as CohortInterface)._id }).populate('cohort')
        tempAttendance?.teams.push({
          team: team._id,
          trainees: []
        })
        await tempAttendance?.save();
      }
      if (!attendances.length) {
        const tempTeams = await Team.find({ active: true, isJobActive: true, cohort: (team.cohort as CohortInterface)._id }).populate('cohort')
        await Attendance.create({
          week: (lastWeek + 1),
          phase,
          cohort: (team.cohort as CohortInterface)._id,
          teams: tempTeams.map(team => {
            const isPhaseTrue = (team.phase && (team.phase as mongoose.Types.ObjectId).equals(phase.toString())) || ((team.cohort as CohortInterface).phase as unknown as mongoose.Types.ObjectId).equals(phase.toString())
            if (!completedTeamsId.includes(team._id.toString()) && isPhaseTrue) {
              return { team, trainees: [] };
            }
          }).filter(team => team)
        })
      }
    }
  } catch (error) {
    console.error('Error in scheduled job:', error);
  }
}

// Schedule a job to add a new week on monday
cron.schedule('0 0 * * 1', async () => {
  addNewAttendanceWeek();
});