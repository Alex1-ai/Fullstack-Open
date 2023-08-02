const User  = require("../models/user")
const Blog = require("../models/blog")


const initialBlogs = [
    {
      
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        user:"64c92d4fb693f653f2dfe03c"
       
    },
    {
       
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        user:"64c92d4fb693f653f2dfe03c"
        
       
    },
]


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}










const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u=>u.toJSON())
}



// module.exports = {
//     usersInDb,
// }

module.exports = {
    blogsInDb, initialBlogs,usersInDb
}