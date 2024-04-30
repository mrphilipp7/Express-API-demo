const mongoose = require("mongoose");

const googleUserSchema = mongoose.Schema(
  {
    googleId: {
      type: String,
      required: [true, "provide a googleid"],
      unique: [true, "id is alread taken"],
    },
    displayName: {
      type: String,
      required: [true, "Please enter a display name"],
    },
    provider: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GoogleUser", googleUserSchema);
