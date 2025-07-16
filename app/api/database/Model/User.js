import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    IsAdmin: {
        type: Boolean,
        default: false
    },
    IsSuperAdmin: {
        type: Boolean,
        default: false
    },
    IsVerified: {
        type: Boolean,
        default: false
    },
    VerificationCode:{
        type:String
    }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
