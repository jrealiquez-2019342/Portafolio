
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password:{
        type: String,
        minLength: [8, 'Password must be 8 characters'],
        required: true
    },
    email: {
        type: String,
        require: true
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        require: true
    },
    role:{
        type: String,
        uppercase: true,
        enum: ['ADMIN', 'CLIENT'],
        required: true
    }
});

//pre mongoose
                            //en la base de datos aparece users, siempre le agregara la s en la base de datos, sino seria userss
export default mongoose.model('user', userSchema)