import mongoos from "mongoose";

const commentSchema = new mongoos.Schema({
    text: { type: String, required: true },
    owner: { type: mongoos.Schema.Types.ObjectId, required: true, ref: "User" },
    video: { type: mongoos.Schema.Types.ObjectId, required: true, ref: "Video" },
    createdAt: { type: Date, required: true, default: Date.now },
})

const Comment = mongoos.model("Comment", commentSchema);
export default Comment;