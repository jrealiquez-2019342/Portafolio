import mongoose from "mongoose";
const {Schema, model} = mongoose;
import Keeper from "./../keeper/keeper.model.js"

const petSchema = Schema({
    keeperId:{
        type: Schema.Types.ObjectId,
        ref: 'keeper',
        required: true
    },
    name:{
        type:String,
        required: true
    },
    typeOfAnimal:{
        type: String,
        uppercase: true,
        enum:['AVE', 'ANFIBIO', 'MAMÍFERO', 'REPTIL', 'PEZ'],
        required: true
    },
    breed:{
        type: String,
        required: true
    }
},{
    versionKey: false
})

export default model('pet', petSchema);