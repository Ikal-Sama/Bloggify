import Blogs from "@/components/Blogs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className='h-screen'>
      <div className='py-25 flex flex-col justify-center items-center gap-5'>
        <h1 className='text-5xl font-bold text-primary '>Bloggify</h1>
        <p className='text-lg w-[35rem] text-center font-medium text-white'>
          Blogify is a user-friendly blog posting web application that allows
          users to create, share, and engage with blog posts.
        </p>

        <Link to='/blogs'>
          <Button className='cursor-pointer mt-10'>
            Get Started <ArrowRight />
          </Button>
        </Link>
      </div>
      {/* <Blogs /> */}
    </div>
  );
}
