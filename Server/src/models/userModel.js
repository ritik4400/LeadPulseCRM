const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tempPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user","superAdmin"],
      default: "user",
    },
    companyId: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      // ref: "Company",
      required: true,
    },
    status:{
      type:Number,
      default: 1,
      required:true,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User',userSchema);
module.exports = User;

/*
status:
0 = delete
1 = active
*/