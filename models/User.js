// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        min: 8,
        select: false
    },

    phoneNumber: {
        type: String,
        default: ""
    },

    photoURL: {
        type: String,
        default: ""
    },

    date: {
        type: Date,
        default: Date.now
    },

    gender: {
        type: String,
        enum: ['male', 'female', 'prefer not to say'],
    },

    resume : [{
        resume_pdf_path: {
            type: String,
            default: ""
        },
        resume_docx_path: {
            type: String,
            default: ""
        },
        resume_name: {
            type: String,
            default: ""
        },
        docType: {
            type: String,
            default: ""
        },
        docCategory: {
            type: String,
            default: ""
        },
        default: {
            type: Boolean,
            default: false
        }
    }],

    emailVerified: {
        type: Boolean,
        default: false
    },

    logoutTime: {
        type: Number,
        default: 15,
        min: 1,
        max: 60,
    },

    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        default: null
    },

    verificationToken: {
        type: String,
        default: ""
    },

    verificationTokenExpiresAt: {
        type: Date,
        default: Date.now
    },

    lastLogin: {
        type: Date,
        default: Date.now
    },
},
{
    timestamps: true,
}
);

// module.exports = mongoose.model('CP_User', UserSchema);
const User = mongoose.model('CP_User', UserSchema);
export default User;