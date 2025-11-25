import { Video } from "../models/Video.js";

export const getLikedVideos = async (req, res) => {
  try {
    const userId = req.user._id;

    const videos = await Video.find({ likes: userId })
      .populate("channel", "channelName")
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
