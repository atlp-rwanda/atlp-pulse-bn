import mongoose, { Schema } from 'mongoose'

const documentationSchema = new Schema(
    {
        title: {
            type: String,
            unique: false,
            required: true,
        },
        for: {
            type: String,
            unique: false,
            required: true,
        },
        description: {

            type: String,
            unique: false,
            required: true,
        },

        subDocuments: {
            type: [Object],
                    
           
        },
    },
    {
        timestamps: true,

    }
)

export const Documentation = mongoose.model('Documentation', documentationSchema)