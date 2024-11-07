import mongoose, { model, Schema, Document } from 'mongoose'
import Program from './program.model'
import Phase from './phase.model'
import Cohort from './cohort.model'
import Team from './team.model'
import User from './user'
import { Profile } from './profile.model'

export interface IOrganization{
  id?: string,
  name: string,
  description?: string,
  gitHubOrganisation?: string,
  activeRepos: string[],
  admin: mongoose.Types.ObjectId[],
  status: string,
  isDeleted: Boolean,
}

export enum ORG_STATUS{
  ACTIVE='active',
  PENDING='pending',
  REJECTED='rejected'
}

const organizationSchema = new Schema<IOrganization>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  gitHubOrganisation: {
    type: String,
  },
  activeRepos: {
    type: [String],
  },
  admin: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(ORG_STATUS),
    default: ORG_STATUS.PENDING,
  },
})

organizationSchema.pre('save',async function(next){
  if(this.isDeleted){
    await Program.updateMany({ organization: this._id },{
      $set: { isDeleted: true }
    })
    await Cohort.updateMany({ organization: this._id },{
      $set: { isDeleted: true }
    })
    await Team.updateMany({ organization: this._id },{
      $set: { isDeleted: true }
    })
    await Phase.updateMany({ organization: this._id },{
      $set: { isDeleted: true }
    })
    await Profile.updateMany({ orgId: this._id },{
      $set: { isDeleted: true }
    })
    const orgUsers = await User.find({"organizations.orgId": this._id})
    for(const user of orgUsers){
      const orgData = user.organizations.find(data=>data.orgId.toString()===this._id.toString())
      if(!orgData){
        continue
      }
      orgData.isDeleted = true
      await user.save()
    }
  }
  next()
})

const Organization = model<IOrganization>('Organization', organizationSchema)
export { Organization }
