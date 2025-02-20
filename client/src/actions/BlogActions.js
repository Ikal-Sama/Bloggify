// this is where my blog function is called
import axios from "axios"

const apiUrl = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api`,
    withCredentials: true
})

export const getAllBlogPosts = async() => {
    try {
        const response = await apiUrl.get(`/post`)
        if(!response.data){
            throw new Error(`There is no blog posts`)
        }
        return response.data
    } catch (error) {
        throw new Error(`Something went wrong: ${error.message}`)
    }
}

export const createBlog = async(formData) => {
    try {
        const response = await apiUrl.post('/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        throw new Error(`Something went wrong: ${error.message}`)
    }
}

export const likePost = async(postId) => {
    const response = await apiUrl.put(`/post/${postId}/like`)
    return response.data
}

export const disLikePost = async(postId) => {
    const response = await apiUrl.put(`/post/${postId}/dislike`)
    return response.data
}