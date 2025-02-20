import { disLikePost, getAllBlogPosts, likePost } from "@/actions/BlogActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Card, CardFooter } from "./ui/card";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function Blogs() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogPosts,
    staleTime: 2000,
  });

  const [userInteractions, setUserInteractions] = useState({});

  const { mutate: likeMutation } = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const { mutate: disLikeMutation } = useMutation({
    mutationFn: disLikePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  console.log(data);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) return <div>error: ${error}</div>;
  return (
    <div className='mt-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center items-center'>
        {data?.map((blog) => {
          const isLiked = blog.likedByUser;
          const isDisliked = blog.dislikedByUser;

          return (
            <Card
              key={blog._id}
              className='w-[325px] h-[450px] flex flex-col p-3'
            >
              {/* Image Wrapper */}
              <div className='w-full h-60 overflow-hidden rounded-sm'>
                <img
                  src={`${
                    import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
                  }/images/${encodeURIComponent(blog.image)}`}
                  alt={blog.title}
                  className='w-full h-full object-cover'
                />
              </div>

              {/* Title & Like/Dislike Icons */}
              <div className='mt-3'>
                <div className='flex gap-2 items-center mt-2 justify-end'>
                  {/* Like Button */}
                  <ThumbsUp
                    size={20}
                    className={`cursor-pointer transition-all  ease-linear ${
                      isLiked ? "text-blue-500" : "text-slate-700"
                    }`}
                    onClick={() => likeMutation(blog._id)}
                  />

                  {/* Dislike Button */}
                  <ThumbsDown
                    size={20}
                    className={`cursor-pointer transition-all  ease-linear ${
                      isDisliked ? "text-red-500" : "text-slate-700"
                    }`}
                    onClick={() => disLikeMutation(blog._id)}
                  />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-slate-700'>
                    {blog.title}
                  </h2>
                  <span className='text-muted-foreground text-sm'>
                    Created by: {blog.userId?.firstname || "Unknown Author"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className='text-md text-muted-foreground mt-2 line-clamp-3'>
                {blog.description}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
