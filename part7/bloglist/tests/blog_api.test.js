const mongoose = require("mongoose")
const supertest = require("supertest")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
const app = require("../app")
const helper = require("./test_helper")
const  api = supertest(app)
const Blog = require("../models/blog")
// const User = require("../models/user")

// const initialBlogs = [
//     {
      
//         title: "Canonical string reduction",
//         author: "Edsger W. Dijkstra",
//         url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//         likes: 12,
       
//     },
//     {
       
//         title: "First class tests",
//         author: "Robert C. Martin",
//         url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//         likes: 10,
       
//     },
// ]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
},100000)

test("blogs are return as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type",/application\/json/)
}, 100000)

test("verifies that the unique identifier property of the blog posts is named id", async () => {
    const response = await helper.blogsInDb()
    // const response = await api.get("/api/blogs")
    expect(response[0].id).toBeDefined()
})

test("all blogs are returned", async ()=>{
    const response = await helper.blogsInDb()
    // const response = await api.get("/api/blogs")

    expect(response).toHaveLength(helper.initialBlogs.length)
})

// test("the first blog is about Http methods", async () => {
//     const response = await api.get("/api/blogs")
//     expect(response.body[0].title).toBe("Go To Statement Considered Harmful")
// })
test("a specific blog is within the returned blogs", async () =>{
    const response = await helper.blogsInDb()

    const titles = response.map(r=> r.title)
    expect(titles).toContain(
        "First class tests"
    )
})


test("create a new blog for the blogs", async () =>{
    const newUser = {
        username: "mluukkai",
        name: "Matti Luukkainene",
        password: "salainen",
    }


  
    const createUser = await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    
    const user = {
        username:"mluukkai",
        password:"salainen", 


    }
    //login 
    const response = await api
        .post("/api/login") 
        .send(user)
        .set("Content-Type", "application/json")
        .expect(200)
    
    const token = response.token
    
   
    
    // const userForToken = {
    //     username: user.username,
    //     id: user.id
    // }
    // console.log(user.id, user.username)

    // const token = jwt.sign(userForToken, process.env.SECRET)

    
    const newBlog = {
        title: "Type wars",
        author: "Alex Author",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes:1,
        user:createUser._id
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Content-Type", "application/json")
        .set("Authorization", `bearer ${token}`)
        .expect(201)
    
    // const response = await api.get("/api/blogs")
    // expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    

})


// test("", async() =>{

// })

test(" verifies that if the likes property is missing from the request, it will default to the value 0", async() =>{
    const newBlog = {
        title: "Super wars",
        author: "Alex Author",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/SuperWars.html",
            
    }

    const response = await api
        .post("/api/blogs")
        .send(newBlog)
        // .expect(201)
    expect(response.status).toBe(201)
    expect(response.body.likes).toBe(0)
})


test("blog without content is not added", async() =>{
    const newBlog = {
        title: "Just Testing"
    }
    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400)


    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(helper.initialBlogs.length)
}




)


test("update a blog with put", async () =>{
    const blogs = await api.get("/api/blogs")
    const blogToUpdate = blogs.body[0]
    const updatedLikes = 12

    const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
        .send({likes: updatedLikes})
        .expect(200)
    expect(response.body.likes).toBe(updatedLikes)
})

test("a blog can be deleted", async () =>{
    const blogs = await api.get("/api/blogs")
    const blogToDelete = blogs.body[0]
    

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogAtEnd = await helper.blogsInDb()
    expect(blogAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )
})



// USERS TEST
// describe("when there is initially one user in db", () => {
//     // ...
//     beforeEach(async () => {
//         await User.deleteMany({})


//         const passwordHash = await bcrypt.hash("sekret",10)
//         const user = new User({username:"root", passwordHash})

//         await user.save()
//     }, 100000)

//     test("creation socceeds with a fresh username", async () => {
//         const usersAtStart   = await helper.usersInDb()

//         const newUser = {
//             username: "mluukkai",
//             name: "Matti Luukkainene",
//             password: "salainen",
//         }

//         await api
//             .post("/api/users")
//             .send(newUser)
//             .expect(201)
//             .expect("Content-Type", /application\/json/)
        
//         const usersAtEnd = await helper.usersInDb()
//         expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
//         const usernames = usersAtEnd.map(u => u.username)
//         expect(usernames).toContain(newUser.username)
//     })
//     test("creation fails with proper statuscode and message if username already taken", async () => {
//         const usersAtStart = await helper.usersInDb()
  
//         const newUser = {
//             username: "root",
//             name: "Superuser",
//             password: "salainen",
//         }
  
//         const result = await api
//             .post("/api/users")
//             .send(newUser)
//             .expect(400)
//             .expect("Content-Type", /application\/json/)
  
//         expect(result.body.error).toContain("expected `username` to be unique")
  
//         const usersAtEnd = await helper.usersInDb()
//         expect(usersAtEnd).toEqual(usersAtStart)
//     })
// })

afterAll(async () => {
    await mongoose.connection.close()
})
