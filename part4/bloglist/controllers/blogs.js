const blogRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const User = require("../models/user")
const middleware = require("../utils/middleware")


// const getTokenFrom = request => {
//     // console.log("Checking")
//     const authorization = request.get("authorization")
//     // console.log(authorization)
//     // console.log("Moving")
//     if (authorization && authorization.startsWith("bearer ")){
//         // console.log("ENtered here")
//         return authorization.replace("bearer ", "")
//     }
//     // console.log("Esle Case")
//     return undefined
// }

blogRouter.get("/", async(request, response) => {
    const blogs = await Blog.find({}).populate("user", {username:1,name:1})
    response.json(blogs)
    // Blog
    //     .find({})
    //     .then(blogs => {
    //         response.json(blogs)
    //     })
})


blogRouter.delete("/:id",middleware.userExtractor, async(request,response) => {
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log(decodedToken)
    if(!decodedToken || !decodedToken.id){
        console.log("Invalid 1")
        return response.status(401).json({
            error: "invalid or missing token"})
    }
    const userId = request.user
    console.log(userId)
    console.log("invalid 2")
    const blog = await Blog.findById(request.params.id) 
    if(!blog){
        console.log("Invalid 3")
        return response.status(404).json({
            error:"Blog not found"
        })
    } 
    console.log("invalid 5")
    console.log(`blog user ${blog.user.toString()}`)
    if (userId.toString() !== blog.user.toString()){
        console.log("invalid 6")
        return response.status(401).json({
            error: "Unauthorized user"
        })
    }

    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    if(!deletedBlog){
        response.status(404).end()

    }
    response.status(204).end()
    
    

 

})


blogRouter.put("/:id", async(request, response)=>{
    const { likes } = request.body

    
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes },{new:true})
    if (!updatedBlog) {
        response.status(404).json({
            error:"Blog post not found"})
    }
    // response(updatedBlog)
    response.status(200).json(updatedBlog)

    

})





blogRouter.post("/", middleware.userExtractor, async(request, response) => {
    const body = request.body
    // console.log("1")
  
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // console.log("2")
    if (!decodedToken.id) {
        // console.log("3")
        return response.status(401).json({
            error: "token invalid"})
    }
    // console.log("4")
    const user = await User.findById(decodedToken.id)

    // console.log("5")
    const blog = new Blog(
        {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes === undefined? 0 : body.likes,
            user:user._id
        }
    )
    // console.log("6")

    // try{
    const savedBlog = await blog.save()
    // console.log("7")
    user.blogs = user.blogs.concat(savedBlog._id)
    // console.log("8")
    await user.save()
    // console.log("9")
    response.status(201).json(savedBlog)
    // console.log("10")
    // }catch(exception) {
    //     next(exception)
    // }
  
    // blog
    //     .save()
    //     .then(result => {
    //         response.status(201).json(result)
    //     })
    //     .catch(error => next(error))
})


module.exports = blogRouter