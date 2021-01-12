const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }],
    avatar:{
        type: Buffer
    }
},{timestamps: true})

UserSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = await jwt.sign({_id:user._id.toString()},'thisisnodecourse',{expiresIn:'7 days'})
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.statics.findByCredentials = async (username,password)=>{
    const user = await User.findOne({username})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

UserSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

const User = mongoose.model('users', UserSchema)

module.exports = User