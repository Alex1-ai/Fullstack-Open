const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]


const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
// const Book =require('./models/book')
// const Author =require("./models/author")
const User = require("./models/user")
const jwt = require('jsonwebtoken')
require('dotenv').config()
// const { GraphQLError } = require('graphql')
// const { UserInputError } = require('apollo-server')

// SUBSCRIPTION CONFIGURATION
const { expressMiddleware } = require("@apollo/server/express4")
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const MONGODB_URI=process.env.MONGODB_URI

console.log('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI)
   .then(()=>{
    console.log('connected to MongoDB')
   })
   .catch((error)=>{
    console.log('error connection to MongoDB:', error.message)
   })


  
/*
  you can remove the placeholder query once your first one has been implemented 
*/

// const typeDefs = `
//   type User {
//     username: String!
//     favoriteGenre: String!
//     id: ID!
//   }

//   type Token {
//     value: String!
//   }

//   type Book {
//     title: String!
//     published: Int!
//     author: Author
//     genres:[String!]!
//     id: ID!
//   }

//   type Author{
//     name:String!
//     id: ID!
//     born:Int
//     bookCount:Int

//   }

//   type Query {
//     bookCount:Int!
//     authorCount: Int!
//     allBooks(author:String, genre:String): [Book!]!
//     allAuthors:[Author!]!
//     findBook(title:String!):Book

//     me:User
//     booksInFavoriteGenre: [Book!]!

//   }

//   type Mutation{

    
//     addBook(
//       title: String!
//       published: Int!
//       author: String!
//       genres:[String!]!
      

//     ): Book

//     editAuthor(
//       name:String!
//       setBornTo:Int!
//     ): Author


//     createUser(
//       username: String!
//       favoriteGenre: String!
//     ): User
    

//     login(
//       username: String!
//       password: String!

//     ): Token
//   }
// `



// const resolvers = {
//   Query: {
//     // bookCount: ()=>books.length,
//     bookCount: async ()=>Book.collection.countDocuments(),
//     authorCount: async ()=>Author.collection.countDocuments(),
//     // authorCount: ()=> [...new Set(books.map(book=>book.author))].length,
//     // authorCount: ()=>authors.length,
//     allAuthors: async() => {
//         return Author.find({})
//         // return authors.map(author => ({
//         //   name: author.name,
//         //   bookCount: books.filter(book => book.author === author.name).length,
//         //   born:author.born,
//         //   id: author.id
//         // }));
//       },

//       booksInFavoriteGenre: async (root, args, context) => {
//         const currentUser = context.currentUser;
//         if (!currentUser) {
//           throw new GraphQLError('not authenticated',{
//             extensions: {
//               code: 'BAD_USER_INPUT'
//             }
//           })
//         }

  
//       const user = await User.findById(currentUser.id);
//       if (!user) {
//         throw new GraphQLError('user not found',{
//           extensions: {
//             code: 'BAD_USER_INPUT'
//           }
//         })
//       }

//       const books = await Book.find({ genres: user.favoriteGenre }).populate(
//         "author"
//       );
//       return books;
//     },
//       allBooks: async (root, args) => {
//         const filters = {};
    
//         if (args.author) {
//           const author = await Author.findOne({ name: args.author });
//           if (author) {
//             filters.author = author._id;
//           } else {
//             return []; // No books for this author
//           }
//         }
    
//         if (args.genre) {
//           filters.genres = args.genre;
//         }
    
//         if (!args.author && !args.genre) {
//           return Book.find({})
//             .populate('author', { name: 1, born: 1 }) // Populate author information
//             .exec();
//         }
    
//         // Only the genre parameter is provided
//         if (!args.author && args.genre) {
//           return Book.find({ genres: args.genre })
//             .populate('author', { name: 1, born: 1 }) // Populate author information
//             .exec();
//         }
    
//         return Book.find(filters)
//           .populate('author', { name: 1, born: 1 }) // Populate author information
//           .exec();
//       },
    

//     // allBooks: async(root, args) => {

//     //   // return Book.find({})
//     //   if (args.author && args.genre) {
//     //     return books.filter(book => book.author === args.author && book.genres.includes(args.genre));
//     //   } else if (args.author) {
//     //     return books.filter(book => book.author === args.author);
//     //   } else if (args.genre) {
//     //     return books.filter(book => book.genres.includes(args.genre));
//     //   }
//     //   return books;
//     // },

//     // findBook: async(root,args) => Book.findOne({title:args.title})
//     me: (root, args, context) =>{
//       return context.currentUser
//     }



//   },

//   Mutation: {
//     addBook: async(root, args, context) =>{
//       const currentUser = context.currentUser
//       console.log("Backend", currentUser)
//       if(!currentUser){
//         throw new GraphQLError('not authenticated',{
//           extensions: {
//             code: 'BAD_USER_INPUT'
//           }
//         })
//       }
//       if(args.title.length < 5 || args.author.length < 4){
//         throw new GraphQLError(' book title should be greater than 4 and author should be greater than 3',{
//           extensions: {code:'BAD_USER_INPUT'}
//         })
//       }
//       const existingAuthor = await Author.findOne({name:args.author})

//       let authorId;

//       if (!existingAuthor){
//         const newAuthor = new Author({
//           name:args.author,

//         })
//         console.log("Checking")
//         const savedAuthor = await newAuthor.save()

//         authorId = savedAuthor._id

//       }else{
//         authorId = existingAuthor._id

//       }

//       const newBook = new Book({
//         title: args.title,
//         published:args.published,
//         author:authorId,

//         genres: args.genres

//       })

//       try {
//         const savedBook = await newBook.save();
//         return savedBook;
//       } catch (error) {
//         console.log(error)
//         throw new GraphQLError('Saving book failed, each title must be unique and greater than 5', {
//           extensions:{
//             code :'BAD_USER_INPUT',
//             invalidArgs: args.title,
//             error
//           }

//           // invalidArgs: args,
//         });
//       }


//       // const book = { ...args, id:uuid()}
//       // books = books.concat(book)

//       // //check if the author already exist
//       // const existingAuthor = authors.find(author=>author.name===args.author)
//       // if(!existingAuthor){
      
//       //   authors.push({
//       //     name:args.author,
//       //     id:uuid()
          
//       //   })
//       // }
//       // // console.log(authors)

//       // return book
//     },

//     editAuthor:async(root, args,context)=>{
//       const currentUser = context.currentUser

//       if(!currentUser){
//         throw new GraphQLError('not authenticated',{
//           extensions: {
//             code: 'BAD_USER_INPUT'
//           }
//         })

//       }
//       const authorToEdit  = await Author.findOne({name:args.name})
//       if(authorToEdit){
//         authorToEdit.born = args.setBornTo
//         return authorToEdit
//       }
//       return null
//       // const authorToEdit = authors.find(author=> author.name===args.name)
//       // if(authorToEdit){
//       //   authorToEdit.born = args.setBornTo
//       //   return authorToEdit
//       // }
//       // return null
//     },

//     createUser: async (root, args) => {
//       const user = new User({username:args.username,favoriteGenre: args.favoriteGenre})

//       return user.save()
//         .catch(error=>{
//           throw new GraphQLError('Creating the user failed', {
//             extensions: {
//               code: 'BAD_USER_INPUT',
//               invalidArgs: args.name,
//               error
//             }
//           })
//         })
//     },

//     login: async (root, args) =>{
//       const user = await User.findOne({username:args.username})

//       if (!user || args.password !== 'secret'){
//         throw new GraphQLError('wrong credentials',{
//           extensions: {
//             code: 'BAD_USER_INPUT'
//           }
//         })

//       }

//       const userForToken = {
//         username: user.username,
//         id: user._id
//       }

//       return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
//     }



//   }
// }


// SETUP FOR SUBSCRIPTION

const start = async () =>{
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server:httpServer,
    path:'/'
  })

  const schema = makeExecutableSchema({typeDefs, resolvers})
  const serverCleanup = useServer({ schema }, wsServer)



  const server = new ApolloServer({
    schema,
    // schema: makeExecutableSchema({typeDefs,resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
      {
      async serverWillStart(){
        return {
          async drainServer() {
            await serverCleanup.dispose()
          }
        }
      }
      }
    
    
    ]


  })


  await server.start()


  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server,{
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization:null
        if(auth && auth.startsWith('bearer ')){
          const decodedToken= jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User
              .findById(decodedToken.id)
            // console.log(currentUser," look")
            return { currentUser }

        }
      }
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, ()=>
  console.log(`Server is now running on http://localhost:${PORT}`)
  )


}

start()
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// })

// startStandaloneServer(server, {
//   listen: { port: 4000 },
//   context: async ({req, res})=>{
//     const auth = req ? req.headers.authorization : null
//     // console.log("authorization ",auth)
//     if (auth && auth.startsWith('bearer ')){
//       const decodedToken = jwt.verify(
//         auth.substring(7), process.env.JWT_SECRET
//       )

//       const currentUser = await User
//         .findById(decodedToken.id)
//       // console.log(currentUser," look")
//       return { currentUser }
//     }
//   }
// }).then(({ url }) => {
//   console.log(`Server ready at ${url}`)
// })