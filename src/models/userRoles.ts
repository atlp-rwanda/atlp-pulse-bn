import mongoose, { Schema } from 'mongoose'
import { Roles } from '../types/roles';


const UserRole = mongoose.model(
  'UserRole',
  new Schema({
    title: {
      type: String,
      enum: [...Object.values(Roles), 'custom'],
      default: Roles.Trainee,
      unique: true,
    },
  })
);

export default UserRole;
