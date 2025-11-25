import { Channel } from "../models/Channel.js";
import { Video } from "../models/Video.js";

export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;
    const channel = await Channel.create({
      channelName,
      description,
      channelBanner,
      owner: req.user._id
    });
    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    const videos = await Video.find({ channel: channel._id }).sort({
      createdAt: -1
    });

    res.json({ channel, videos });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    if (String(channel.owner) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Channel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    if (String(channel.owner) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Video.deleteMany({ channel: channel._id });
    await channel.deleteOne();
    res.json({ message: "Channel and videos deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

