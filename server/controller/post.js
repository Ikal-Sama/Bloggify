import { createError } from "../utils/error.js"
import upload from "../utils/uploadImage.js"
import Post from '../models/postModel.js'


export const createPost = async(req, res, next) => {
  try {
    upload.single("image")(req, res, async(err) => {
        if(err) {
            return next(createError(400, "Error uploading"))
        }
        const userId = req.user?.id;
        const { title, description } = req.body;
        const image = req.file ? req.file.filename : null

        if(!title || !description) {
            return next(createError(400, "Title and description are required"))
        }

        const newPost = new Post({
            userId,
            title,
            description,
            image,
        })

        await newPost.save();
        res.status(201).json(newPost);
    })
  } catch (error) {
    return next(createError(500, error.message))
  }
}

export const getAllPosts = async(req, res, next) => {
    const userId = req.user.id; 
    const posts = await Post.find().populate("userId", "firstname");

    const formattedPosts = posts.map((post) => ({
      ...post.toObject(),
      likedByUser: post.likes.includes(userId),
      dislikedByUser: post.dislikes.includes(userId),
    }));

    res.status(200).json(formattedPosts);
}

export const getPostById = async(req, res, next) => {
    try {
        const id = req.params.id
        const post = await Post.findById(id)
        if(!post) return next(createError(404, "Post not found"));
        
        res.status(200).json(post);
    } catch (error) {
        return next(createError(500, error.message))
    }
}
export const updatePost = async(req, res, next) => {
    try {
        upload.single("image")(req, res,async (err) => {
            if(err)
                return next(createError(400, "Error uploading"))
            const {title, description} = req.body;
            const postId = req.params.id

            // find the existing post
            const post = await Post.findById(postId)
            if(!post) return next(createError(404, "Post not found"));

            // update field only if provided
            if (title) post.title = title;
            if (description) post.description = description;
            if (req.file) post.image = req.file.filename;

            await post.save();
            res.status(200).json({message: "Post updated successfully"});
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}

export const deletePost = async(req, res, next) => {
    try {
        const postId = req.params.id;
        
        const post = await Post.findById(postId)
        if(!post) return next(createError(404, "Post not found"));

        if(!post.userId || post.userId.toString() !== req.user.id)
            return next(createError(403, "You are not authorized to delete this post"))
        
        await Post.deleteOne({_id: postId})
        res.status(200).json({message: "Post deleted successfully"});
    } catch (error) {
        return next(createError(500, error.message))
    }
}

export const likePost = async (req, res) => {
    try {
      const userId = req.user.id;
      const post = await Post.findById(req.params.id);
  
      if (!post) return res.status(404).json({ error: "Post not found" });
  
      // If user already liked it, remove like
      if (post.likes.includes(userId)) {
        post.likes.pull(userId);
      } else {
        post.likes.push(userId);
        post.dislikes.pull(userId); // Remove from dislikes if present
      }
  
      await post.save();
      res.status(200).json({ message: "Like updated", likes: post.likes.length });
    } catch (error) {
      res.status(500).json({ error: "Error updating like" });
    }
  };

export const dislikePost = async (req, res) => {
    try {
      const userId = req.user.id;
      const post = await Post.findById(req.params.id);
  
      if (!post) return res.status(404).json({ error: "Post not found" });
  
      // If user already disliked it, remove dislike
      if (post.dislikes.includes(userId)) {
        post.dislikes.pull(userId);
      } else {
        post.dislikes.push(userId);
        post.likes.pull(userId); // Remove from likes if present
      }
  
      await post.save();
      res.status(200).json({ message: "Dislike updated", dislikes: post.dislikes.length });
    } catch (error) {
      res.status(500).json({ error: "Error updating dislike" });
    }
  };