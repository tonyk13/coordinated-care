const tagsModel = require("../models/tags");
const questionModel = require("../models/questions");

// GET request for all the tags.
exports.tags_list = async (req, res, next) => {
    try {
        const tags = await tagsModel.find().exec();

        res.json(tags);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

// POST request for creating a tag.
exports.tags_post = async (req, res, next) => {
    try {
        const tag = new tagsModel(req.body);

        await tag.save();

        return res.status(201).json(tag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET request for a tag (might not need this)
exports.tag_get = async (req, res, next) => {
    try {
        const tag = await tagsModel.findById(req.params._id).exec();

        if (!tag) {
            return res.status(404).json({ message: "Tag not found" });
        }

        res.json(tag);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.tag_put = async (req, res) => {
    try {
        const { _id } = req.params;
        const { name } = req.body;

        const updatedTag = await tagsModel.findByIdAndUpdate(_id, { name }, { new: true });

        if (!updatedTag) {
            return res.status(404).json({ message: "Tag not found" });
        }

        res.json(updatedTag);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.tag_delete = async (req, res) => {
    try {
        const { _id } = req.params;
        const deletedTag = await tagsModel.findByIdAndDelete(_id);
        if (!deletedTag) {
            return res.status(404).json({ message: "Tag not found" });
        }
        await questionModel.updateMany({ tags: _id }, { $pull: { tags: _id } });

        res.json({ message: "Tag deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
