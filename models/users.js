const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, required: true, maxLength: 100 },
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
});

//const User = mongoose.model("User", UserSchema);


/* User.insertMany(
    [
        {
            username: "luca",
            password: "luca",
        },
        {
            username: "davide",
            password: "davide",
        },
    ],
    (err, res) => {
        if (err) return console.log(err);
        else return console.log("Result: ", res)
    }
); */
 
// Export model
module.exports = mongoose.model("User", UserSchema, 'users');