import { z } from "zod"
 
export const registerSchema = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  email: z.string().email("Email is required"),
  password: z.string().min(5),
  confirmPassword: z.string().min(5),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"]
})

export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(5),
})

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().max(500).min(5, "Description is need atleast 5 characcters long"),
  image: z.any().nullable(), // Image is optional
})