import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    image: {
        type: String,
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, {
    timestamps: true
})

const Post =  mongoose.model("Post", postSchema);
export default Post;