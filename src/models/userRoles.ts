import mongoose, { Schema } from 'mongoose'
import { Roles } from '../types/roles';


const UserRole = mongoose.model(
  'UserRole',
  new Schema({
    name: {
      type: String,
      enum: [...Object.values(Roles), 'custom'],
      unique: true,
    },
  })
);

export default UserRole;
