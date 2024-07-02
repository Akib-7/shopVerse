const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// timestamps is the second arg of schema which will create updated at: , created at: fields
mongoose.models = {};
const userModel = mongoose.model("user", UserSchema);
export default userModel;
