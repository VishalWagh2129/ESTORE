const mongoose = require('mongoose');

const pluginSchema = new mongoose.Schema({
  created_by: { type: String, required: true },
  updated_by: { type: String, required: true },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
  plugin_id: { type: String, required: true, unique: true },
  plugin_name: { type: String, required: true },
  pluginSettings: {
    secretKey: { type: String, required: true }
  },
  record_status: { type: String, default: 'ACTIVE' },
}, { versionKey: false });

const Plugin = mongoose.model('Plugin', pluginSchema);
module.exports = Plugin;
