const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Transport = new Schema(
  {
    name: { type: String, required: [true, "field is required"] },
    born: { type: Date, required: [true, "field is required"] },
    pickAddress: { type: String, required: false },
    deliveryAddress: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transport", Transport);
