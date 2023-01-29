const mongoose = require('mongoose');

const ReportsSchema = mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", populate: {} },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", populate: {} },
  reportedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", populate: {} },
  greddit: { type: mongoose.Schema.Types.ObjectId, ref: "SubGreddit", populate: {} },
  time: { type: Date },
  status: { type: String },
  concernText: { type: String },
}, { timestamps: true })

const Reports = mongoose.model('Reports', ReportsSchema);

module.exports = Reports;