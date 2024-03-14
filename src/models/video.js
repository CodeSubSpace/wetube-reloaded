import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 80 },
    description: { type: String, required: true, trim: true, minLength: 5 },
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true },
    },
});

videoSchema.pre('save', async function() { // 모델이 생성되기 전에 middleware가 위치해야 한다.
    this.hashtags = this.hastags[0].split(',').map(word => (word.startsWith("#") ? word : `#${word}`))
})


const Video = mongoose.model("Video", videoSchema); // 반드시 upper Case
export default Video;