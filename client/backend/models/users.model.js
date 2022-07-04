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
    name : {
        type : String,
        default:"Adam/Eve",
        trim: true,
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
        deafult:"000-0000-000"
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
        default:"Dummy Number, Dummy Street, Dummy City, Dummy Country, Dummy Pincode Dummy Phone Number"
        
    },
    profileImage : {
        type : String,
        default:"arrey default se ma chudi padi hui hai"
        // please edit
    },
    bio : {
        type : String,
        deafult:"Hey! I am enjoying VPOC!"
    },
    wishList : [{
        type : String,
    }]
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;


