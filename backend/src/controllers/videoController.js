import { Video } from "../models/Video.js";

export const getVideos = async (req, res) => {
  try {
    const { search, category } = req.query;

    const query = {};
    if (search) query.title = { $regex: search, $options: "i" };
    if (category && category !== "All") query.category = category;

    const videos = await Video.find(query)
      .populate("channel")
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("channel");
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.views += 1;
    await video.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createVideo = async (req, res) => {
  try {
    const { title, description, thumbnailUrl, videoUrl, channelId, category } =
      req.body;

    const video = await Video.create({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      channel: channelId,
      category
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json({ message: "Video deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const userId = req.user._id;

    const liked = video.likes.includes(userId);
    const disliked = video.dislikes.includes(userId);

    if (liked) {
      video.likes.pull(userId);
    } else {
      video.likes.push(userId);
      if (disliked) video.dislikes.pull(userId);
    }

    await video.save();
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleDislike = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const userId = req.user._id;
    const liked = video.likes.includes(userId);
    const disliked = video.dislikes.includes(userId);

    if (disliked) {
      video.dislikes.pull(userId);
    } else {
      video.dislikes.push(userId);
      if (liked) video.likes.pull(userId);
    }

    await video.save();
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
