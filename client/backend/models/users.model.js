const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        // validate: {
        //     validator: function (v) {
        //         return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        //     },
        //     message: "Please enter a valid email"
        // },
        // required: [true, "Email required"]
    },
    password: {
        type : String,
        required : true,
    },
    phone: {
        type: String,
        // validate: {
        //   validator: function(v) {
        //     return /\d{3}-\d{3}-\d{4}/.test(v);
        //   },
        //   message: props => `${props.value} is not a valid phone number!`
        // },
        // required: [true, 'User phone number required']
    },
    address: {
        type :  String,
        
    },
    image : {
        type : String
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;


