import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    hashtags: [{type: String}],
    meta: {
        views: Number,
        rating: Number,
    },
});

// 
const Video = mongoose.model("Video", videoSchema); // 반드시 upper Case
export default Video;