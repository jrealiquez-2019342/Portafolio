'use strict'

import {Schema, model} from 'mongoose';

const appointmentSchema = Schema({
    date:{
        type: Date,
        required: [true, 'Date is required']
    },
    status:{
        type: String,
        enum: ['CREATED', 'ACEPTED', 'CANCELED', 'COMPLETED'],
        default: 'CREATED',
        require: [true, 'Status is required.']
    },
    animal:{
        type: Schema.Types.ObjectId,
        ref: 'pet',
        required: [true, 'Pet is required.']
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User is required.']
    }
},{
    versionKey: false
})

export default model('appointment', appointmentSchema);