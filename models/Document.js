const mongoose = require("mongoose")

const documentScheme = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
},{ timestamps: true })

module.exports = mongoose.model("Document", documentScheme)