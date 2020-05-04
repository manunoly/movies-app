const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverObj = require("./driver-model");
const routeObj = require("./route-model");

const Transport = new Schema(
  {
    placa: { type: String, required: [true, "field is required"] },
    color: { type: String, required: [true, "field is required"] },
    colorSecondary: { type: String, required: false },
    routes: [{ type: Schema.Types.ObjectId, ref: "route", required: false }],
    driver: { type: Schema.Types.ObjectId, ref: "driver", required: false },
    driverHelper: {
      type: Schema.Types.ObjectId,
      ref: "driver",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transport", Transport);
