const express = require("express");
const router = express.Router();
require("../db/connection");
const User = require("../model/UserSchema");


router.post("/registerd", async (req, res) => {
  //createing post req for registration

  const {name,email,contact,profilePicture,location,Password,CPassword,checkbox} = req.body;

  if (!name ||!email ||!contact ||!Password ||!CPassword)
  {

    return res.status(422).json({ error: "Please fill the form completely" });
  }
  try {
    const finduserExist = await User.findOne({ email: email });
    console.log(finduserExist);
    if (finduserExist) {
      return res.status(422).json({ error: "Email allready exist" });
    } else if (Password != CPassword) {
      return res.status(422).json({ error: "Password not match" });
    } else {
      const user = new User({name,email,contact,profilePicture,location,Password,CPassword,checkbox});
      // ---- before saving bycrpt is running in userSchema ----
      await user.save();
      console.log(`${user} user registerd scuss`);

      res.status(201).json({ message: "successfully saved" });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
