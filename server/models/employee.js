const mongoose = require("mongoose");

// Contains references to: PrivacySettings, NotificationSettings, Message, EmergencyContact

const NotificationSettingsSchema = new mongoose.Schema({
    notificationMethods: {
        type: String,
        default: ''
    },
    appointmentAlerts: {
        type: String,
        default: ''
    },
    taskAssignmentAlerts: {
        type: String,
        default: ''
    },
    messageAlerts: {
        type: String,
        default: ''
    },
    discussionBoardAlerts: {
        type: String,
        default: ''
    }
});

const PrivacySettingsSchema = new mongoose.Schema({
    workScheduleVisibility: {
        type: String,
        default: ''
    },
    patientListVisibility: {
        type: String,
        default: ''
    },
    messagePermission: {
        type: String,
        default: ''
    },
    personalInfoVisibility: {
        type: String,
        default: ''
    },
    phoneNumberVisibility: {
        type: String,
        default: ''
    },
    shareInfoWithDevelopers: {
        type: String,
        default: ''
    }
});



const EmployeeSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	middleName: {
		type: String,
		required: false,
	},
	lastName: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
	},
	passwordHash: {
		type: String,
		required: false,
	},
	privacySettings: {
        type: PrivacySettingsSchema,
        default: { workScheduleVisibility: '', patientListVisibility: '', messagePermission: '', personalInfoVisibility: '', phoneNumberVisibility: '', shareInfoWithDevelopers: '' }
    },
	notificationSettings:{
        type: NotificationSettingsSchema,
        default: { notificationMethods: '', appointmentAlerts: '', taskAssignmentAlerts: '', messageAlerts: '', discussionBoardAlerts: '' }
    },
	role: {
		type: String,
		required: true,
		enum: ["Nurse", "Doctor", "Hospital Faculty", "Admin", "Care Provider"],
	},
	messages: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "Message",
		default: [],
	},
	address: {
		type: String,
		required: true,
	},
	emergencyContact: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "EmergencyContact",
		required: false,
	},
	professionalCredentials: {
		type: [String],
	},
	education: {
		type: [String],
	},
	specialties: {
		type: [String],
		required: false,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
	schedule: {
		type: [String],
		required: false,
	},
	professionalQualifications: {
		type: String,
	},
	resetPasswordToken: {
		type: String,
	},
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
