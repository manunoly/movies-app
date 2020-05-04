const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Driver = new Schema(
    {
        name: { type: String, required: [true, 'field is required'] },
        phone: { type: String, required: [true, 'field is required'] },
        phone1: { type: String, required: false },
        photo: { type: String, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('driver', Driver)
