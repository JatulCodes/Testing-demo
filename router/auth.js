const express = require("express");
require("../db/connection");

const router = express.Router();
const bcrypt = require('bcryptjs')
const cors = require('cors');
const bodyParser = require('body-parser');
const multer= require('multer')
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json())


const SignUpData = require("../model/UserSchema");


router.get('/', (req, res) => {
  res.send('Health check')
})

// <--------------------------------Rgistration prosses------------------------------------------>


router.post("/register", async (req, res) => {
  //createing post req for registration

  const {name,email,contact,Picture,location,password,cPassword} = req.body;

  if (!name ||!email ||!contact ||!password ||!cPassword )
  {

    return res.status(422).json({ error: "Please fill the form completely" });
  }
  try {
    const finduserExist = await SignUpData.findOne({ email: email });
    console.log(finduserExist);
    if (finduserExist) {
      return res.status(422).json({ error: "Email allready exist" });
    } else if (password != cPassword) {
      return res.status(422).json({ error: "Password not match" });
    } else {
      const user = new SignUpData({name,email,contact,Picture,location,password,cPassword});
      // ---- before saving bycrpt is running in userSchema ----
      await user.save();
      console.log(`${user} user registerd scuss`);

      res.status(201).json({ message: "successfully saved" });
    }
  } catch (err) {
    console.log(err);
  }
});

// <--------------------------------Rgistration prosses end ------------------------------------------>


// <--------------------------------Login prosses start ------------------------------------------>

router.post('/signIn', async (req, res) => {      
    try {
        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({ error: "please fill the form" })

        }

        const UserExist = await SignUpData.findOne({ email: email })     //---------> email validation

        // console.log(UserExist);


        if( UserExist){
        const MatchingPasswords = await bcrypt.compare(password, UserExist.password )

        let token = await UserExist.generateAuthToken();
            console.log(token);

            res.cookie("jwtToken", token,{
                expire: new Date(Date.now() + 2592000000 ),
                httpOnly:true
            });

        if (!MatchingPasswords) {

            res.status(400).json({ error: " Password is wrong" });

        } else {

            res.json({ message: "Sign In successfully" })

        }
        }else{
            res.status(400).json({ error: "Email and Password is wrong" });
        } 

    } catch (err) {
        console.log(err);

    }
})


module.exports = router;
