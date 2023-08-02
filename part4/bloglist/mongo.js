const mongoose= require("mongoose")

mongoose.set("strictQuery", false)
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model("blog",blogSchema)

const url ="mongodb+srv://fullstack:MidJvOO6G8Or13DK@cluster0.gbwjvbq.mongodb.net/testBlogApp?retryWrites=true&w=majority"




mongoose.connect(url) 
// mongoose.connect(url)
// ADDING NEW PHONEBOOK TO THE PHONEBOOK DATABASE
// const person = new Blog({
//     title: "React patterns",
//     author: "Michael Chan",
//     url: "https://reactpatterns.com/",
//     likes: 7,

// })


// person.save().then(() => {
//     console.log("blog saved!")
//     mongoose.connection.close()
// })


// GETTING BACK THE DATA FROM THE SERVER
Blog.find({}).then(result => {
    result.forEach(blog => {
        console.log(` ${blog.title} ${blog.author} ${blog.likes} ${blog.url}`)
    })

    mongoose.connection.close()
})




// if(process.argv.length<3){
//     console.log("give password as argument")
//     process.exit(1)
// }else if(process.argv.length===3){
//     // const password = process.argv[2]/
//     // const url =
//     // `mongodb+srv://fullstack:${password}@cluster0.gbwjvbq.mongodb.net/?retryWrites=true&w=majority`
    
//     mongoose.connect(url)
//     // const password = process.argv[2]

//     Blog.find({}).then(result => {
//         result.forEach(blog => {
//             console.log(` ${blog.title} ${blog.author}`)
//         })

//         mongoose.connection.close()
//     })


// }else if(process.argv.length===5){
//     // const password = process.argv[2]
//     // const title = process.argv[3]
//     // const author = process.argv[4]
//     // const url = 

//     // const url = 
//     // const url =
//     // `mongodb+srv://fullstack:${password}@cluster0.gbwjvbq.mongodb.net/?retryWrites=true&w=majority`

//     mongoose.connect(url)
//     // mongoose.connect(url)
//     // ADDING NEW PHONEBOOK TO THE PHONEBOOK DATABASE
//     const person = new Blog({
//         title: ,
//         number: number
//     })


//     person.save().then(() => {
//         console.log("blog saved!")
//         mongoose.connection.close()
//     })



//}













