const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Route = new Schema(
  {
    start: { type: String, required: [true, "field is required"] },
    end: { type: String, required: [true, "field is required"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("route", Route);
