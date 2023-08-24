const Book =require('./models/book')
const Author =require("./models/author")
const User = require("./models/user")
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
// const { UserInputError } = require('apollo-server')
const { ApolloServer } = require('@apollo/server')
// const { PubSub } = require('graphql-subscriptions')
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub()
const resolvers = {
    Query: {
      // bookCount: ()=>books.length,
      bookCount: async ()=>Book.collection.countDocuments(),
      authorCount: async ()=>Author.collection.countDocuments(),
      // authorCount: ()=> [...new Set(books.map(book=>book.author))].length,
      // authorCount: ()=>authors.length,
      allAuthors: async() => {
          return Author.find({})
          // return authors.map(author => ({
          //   name: author.name,
          //   bookCount: books.filter(book => book.author === author.name).length,
          //   born:author.born,
          //   id: author.id
          // }));
        },
  
        booksInFavoriteGenre: async (root, args, context) => {
          const currentUser = context.currentUser;
          if (!currentUser) {
            throw new GraphQLError('not authenticated',{
              extensions: {
                code: 'BAD_USER_INPUT'
              }
            })
          }
  
    
        const user = await User.findById(currentUser.id);
        if (!user) {
          throw new GraphQLError('user not found',{
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
        const books = await Book.find({ genres: user.favoriteGenre }).populate(
          "author"
        );
        return books;
      },
        allBooks: async (root, args) => {
          const filters = {};
      
          if (args.author) {
            const author = await Author.findOne({ name: args.author });
            if (author) {
              filters.author = author._id;
            } else {
              return []; // No books for this author
            }
          }
      
          if (args.genre) {
            filters.genres = args.genre;
          }
      
          if (!args.author && !args.genre) {
            return Book.find({})
              .populate('author', { name: 1, born: 1 }) // Populate author information
              .exec();
          }
      
          // Only the genre parameter is provided
          if (!args.author && args.genre) {
            return Book.find({ genres: args.genre })
              .populate('author', { name: 1, born: 1 }) // Populate author information
              .exec();
          }
      
          return Book.find(filters)
            .populate('author', { name: 1, born: 1 }) // Populate author information
            .exec();
        },
      
  
      // allBooks: async(root, args) => {
  
      //   // return Book.find({})
      //   if (args.author && args.genre) {
      //     return books.filter(book => book.author === args.author && book.genres.includes(args.genre));
      //   } else if (args.author) {
      //     return books.filter(book => book.author === args.author);
      //   } else if (args.genre) {
      //     return books.filter(book => book.genres.includes(args.genre));
      //   }
      //   return books;
      // },
  
      // findBook: async(root,args) => Book.findOne({title:args.title})
      me: (root, args, context) =>{
        return context.currentUser
      }
  
  
  
    },
  
    Mutation: {
      addBook: async(root, args, context) =>{
        const currentUser = context.currentUser
        console.log("Backend", currentUser)
        if(!currentUser){
          throw new GraphQLError('not authenticated',{
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
        if(args.title.length < 5 || args.author.length < 4){
          throw new GraphQLError(' book title should be greater than 4 and author should be greater than 3',{
            extensions: {code:'BAD_USER_INPUT'}
          })
        }
        const existingAuthor = await Author.findOne({name:args.author})
  
        let authorId;
  
        if (!existingAuthor){
          const newAuthor = new Author({
            name:args.author,
  
          })
          console.log("Checking")
          const savedAuthor = await newAuthor.save()
  
          authorId = savedAuthor._id
  
        }else{
          authorId = existingAuthor._id
  
        }
  
        const newBook = new Book({
          title: args.title,
          published:args.published,
          author:authorId,
  
          genres: args.genres
  
        })
  
        try {
           await newBook.save();
        //   const savedBook = await newBook.save();
        //   return savedBook;
        } catch (error) {
          console.log(error)
          throw new GraphQLError('Saving book failed, each title must be unique and greater than 5', {
            extensions:{
              code :'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
  
            // invalidArgs: args,
          });
        }

        pubsub.publish('BOOK_ADDED',{
            bookAdded:newBook
        })
        return newBook

        
  
  
        // const book = { ...args, id:uuid()}
        // books = books.concat(book)
  
        // //check if the author already exist
        // const existingAuthor = authors.find(author=>author.name===args.author)
        // if(!existingAuthor){
        
        //   authors.push({
        //     name:args.author,
        //     id:uuid()
            
        //   })
        // }
        // // console.log(authors)
  
        // return book
      },
    //   Subscription:{
    //     bookAdded: {
    //         subscribe: ()=>pubsub.asyncIterator('BOOK_ADDED')
    //     },

    //   },
  
      editAuthor:async(root, args,context)=>{
        const currentUser = context.currentUser
  
        if(!currentUser){
          throw new GraphQLError('not authenticated',{
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
  
        }
        const authorToEdit  = await Author.findOne({name:args.name})
        if(authorToEdit){
          authorToEdit.born = args.setBornTo
          return authorToEdit
        }
        return null
        // const authorToEdit = authors.find(author=> author.name===args.name)
        // if(authorToEdit){
        //   authorToEdit.born = args.setBornTo
        //   return authorToEdit
        // }
        // return null
      },
  
      createUser: async (root, args) => {
        const user = new User({username:args.username,favoriteGenre: args.favoriteGenre})
  
        return user.save()
          .catch(error=>{
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          })
      },
  
      login: async (root, args) =>{
        const user = await User.findOne({username:args.username})
  
        if (!user || args.password !== 'secret'){
          throw new GraphQLError('wrong credentials',{
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
  
        }
  
        const userForToken = {
          username: user.username,
          id: user._id
        }
  
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
      }
  
  
  
    },

    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
      }
      
  }


  module.exports = resolvers