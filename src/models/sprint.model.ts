import {Schema, Types, model} from "mongoose"

interface ISprint{
    phase: Types.ObjectId,
    sprintNbr: number,
    organization: Types.ObjectId,
    startDate: String,
    endDate: String,
    isDeleted: boolean,
}

const sprintSchema = new Schema<ISprint>({
    phase:{
        type: Schema.Types.ObjectId,
        required: true,
    },
    sprintNbr:{
        type: Number,
        required: true,
    },
    organization:{
        type: Schema.Types.ObjectId,
        ref:'Organization',
        required: true,
    },
    startDate:{
        type: String,
        required: true,
    },
    endDate:{
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true,
    }
})

const Sprint = model<ISprint>('sprint', sprintSchema)
export default Sprint