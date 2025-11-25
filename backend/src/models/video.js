import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    thumbnailUrl: { type: String, required: true },
    videoUrl: { type: String, required: true }, // as required in PDF
    channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel", required: true },
    category: { type: String, required: true },
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

export const Video = mongoose.model("Video", videoSchema);
