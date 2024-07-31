const Plugin = require('../models/PluginModel');
const generateId = require('../utility/common');

exports.createPlugin = async (req, res) => {
    try {
        const pluginId = await generateId('PLG');
        const { settings,created_by,updated_by, plugin_name, record_status } = req.body;
        const newPlugin = new Plugin({
            plugin_id:pluginId,
            plugin_name,
            created_by,
            updated_by,
            pluginSettings:{
                secretKey:settings.secretKey
            },
            record_status
        });
        const savedPlugin = await newPlugin.save();
        res.status(201).json({ success: true });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getPlugins = async (req, res) => {
    try {
        const plugins = await Plugin.find();
        res.status(200).json({ success: true, data: plugins });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPluginById = async (req, res) => {
    try {
        const { id } = req.params;
        const plugin = await Plugin.findOne({ plugin_id: id });
        if (!plugin) {
            return res.status(404).json({ message: 'Plugin not found' });
        }
        res.status(200).json({ success: true, data: plugin });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePlugin = async (req, res) => {
    try {
        const { id } = req.params;
        const {  settings, plugin_name,updated_by, record_status } = req.body;
        const updatedPlugin = await Plugin.findOneAndUpdate(
            { plugin_id: id },
            {
                pluginSettings:{
                    secretKey:settings.secretKey
                },
                updated_by,
                updated_date: new Date(),
                record_status,
                plugin_name
            },
            { new: true }
        );
        if (!updatedPlugin) {
            return res.status(404).json({ message: 'Plugin not found' });
        }
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePlugin = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPlugin = await Plugin.findOneAndDelete({ plugin_id: id });
        if (!deletedPlugin) {
            return res.status(404).json({ message: 'Plugin not found' });
        }
        res.status(200).json({ message: 'Plugin deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
