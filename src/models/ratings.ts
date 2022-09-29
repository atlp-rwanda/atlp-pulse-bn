import mongoose, { Schema } from 'mongoose'

const Rating = mongoose.model(
    'Rating',
    new Schema({
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        sprint: {
            type: Number,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        quantityRemark: {
            type: String,
            default: 'no remark'
        },
        quality: {
            type: String,
            required: true,
        },
        qualityRemark: {
            type: String,
            default: 'no remark'
        },
        professional_Skills: {
            type: String,
            required: true,
        },
        professionalRemark: {
            type: String,
            default: 'no remark'
        },
        approved: {
            type: Boolean,
            default: true,
        },
        coordinator: {
            type: String,
            ref: 'User',
            required: true,
        }
        
    })
)

const TempData =mongoose.model(
    'TempData',
    new Schema({
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        sprint: {
            type: Number,
            required: true,
        },
        quantity: {
            type: [String],
            default: []
        },
        quantityRemark: {
            type: [String],
            default: ['no remark']
        },
        quality: {
            type: [String],
            default: []
        },
        qualityRemark: {
            type: [String],
            default: ['no remark']
        },
        professional_Skills: {
            type: [String],
            default:[]
        },
        professionalRemark: {
            type: [String],
            default: ['no remark']
        },
        approved: {
            type: Boolean,
            default: false,
        },
        
    })
)

export { Rating, TempData }
