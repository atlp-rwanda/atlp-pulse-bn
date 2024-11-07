import {Schema} from "mongoose";

export const mongooseSoftDelete=(schema: Schema, options: any)=>{
    schema.add({
        isDeleted: {
            type: Boolean,
            required: true,
            default: false
        }
    })
    schema.pre(['find', 'findOne', 'findOneAndDelete', 'findOneAndUpdate'],function(next){
        this.where({ isDeleted: false})
        next()
    })
}