const _ = require("lodash")
const dummy = (blogs) =>{
    if(blogs){
        return 1
    }
    return 1
}


const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, item)=>{
        return sum + item.likes

    },0)

    return total

}

const favoriteBlog = (blogs) => {
    
    
    const mostLikedBlog = blogs.reduce((previous, current)=>
        previous.likes > current.likes ?  previous : current
    )

    const {title,author, likes} = mostLikedBlog
    return { title, author, likes}

}




const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null // If the list of blogs is empty, return null
    }
  
    // Use lodash to group blogs by author and count the number of blogs for each author
    const blogsByAuthor = _.groupBy(blogs, "author")
    const authorWithMostBlogs = _.maxBy(Object.keys(blogsByAuthor), (author) => blogsByAuthor[author].length)
  
    return {
        author: authorWithMostBlogs,
        blogs: blogsByAuthor[authorWithMostBlogs].length,
    }
}



const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null // If the list of blogs is empty, return null
    }
  
    // Use lodash to group blogs by author and calculate the total likes for each author
    const likesByAuthor = _.groupBy(blogs, "author")
    const authorWithMostLikes = _.maxBy(Object.keys(likesByAuthor), (author) =>
        _.sumBy(likesByAuthor[author], "likes")
    )
  
    return {
        author: authorWithMostLikes,
        likes: _.sumBy(likesByAuthor[authorWithMostLikes], "likes"),
    }
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
    
}