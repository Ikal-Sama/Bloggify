import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Upload from "@/assets/upload.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { blogPostSchema } from "@/lib/zodSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import { createBlog } from "@/actions/BlogActions";
import { useState } from "react";

export function CreateBlogForm({ className, ...props }) {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const form = useForm({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
  });

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      if (values.image) {
        formData.append("image", values.image);
      }

      const result = await createBlog(formData);
      console.log("Post successful:", result);
      toast.success("Blog post created successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.message);
      form.setError("email", {
        type: "manual",
        message: error.message, // Use the error message from the API
      });
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      form.setValue("image", file);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Create Blog</CardTitle>
          <CardDescription>
            Fill up the required field to create you're own blog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='mt-5'>
              <div className='flex gap-5'>
                <div className='w-1/2'>
                  <div className='flex flex-col'>
                    <div className='flex justify-center mb-2 cursor-pointer'>
                      <label htmlFor='image-upload' className='cursor-pointer'>
                        <img
                          src={previewImage || Upload}
                          alt='Preview'
                          className='object-cover h-[200px] w-[200px] rounded'
                        />
                      </label>
                    </div>
                    <Input
                      id='image-upload'
                      type='file'
                      accept='image/*'
                      onChange={handleImageChange}
                      className='hidden'
                    />
                    <span className='text-center'>Upload image here</span>
                  </div>
                </div>
                <div className='flex flex-col gap-6 w-1/2'>
                  <div className='grid gap-2'>
                    <FormField
                      control={form.control}
                      name='title'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter title here' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='grid gap-2'>
                    <FormField
                      control={form.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} className='h-32' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type='submit'
                    disabled={form.formState.isSubmitting}
                    className='w-full cursor-pointer'
                  >
                    {form.formState.isSubmitting ? "Creating..." : "Create"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
