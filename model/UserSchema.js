const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  Picture: {
    data: Buffer,
    contentType:String
  },
  location: {
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },
  password: {
    type: String,
    required: true,
  },
  cPassword: {
    type: String,
    required: true,
  },
  checkbox: {
    type: Boolean,
    default:true,
  },
  tokens:[
        {
        token:{
            type:String,
            required:true
        }
    }],
  pending: [
    {
      status: {
        type: Boolean,
      },
      pendingUser: {
        type: String,
      },
    },
  ],
  connected: [
    {
      status: {
        type: Boolean,
      },
      connectedUser: {
        type: String,
      },
    },
  ],
});

userSchema.pre('save', async function (next){
    console.log("hello world");
    try{
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password,10);
            this.cPassword = await bcrypt.hash(this.cPassword,10);
        }

    }catch(err){
        console.log(err)
    }
    next();
});

// generateAuthToken here
userSchema.methods.generateAuthToken = async function (){
    try {
        let token = jwt.sign({_id:this._id},SECRET_KEY );
        this.tokens = this.tokens.concat({token: token});

       await this.save();
       return token;

    } catch (err) {
        console.log(err);
    }
    
}
const SignUpData = mongoose.model("SignUpData", userSchema);
module.exports = SignUpData;
