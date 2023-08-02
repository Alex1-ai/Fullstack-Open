const logger = require("./loggers")
const jwt = require("jsonwebtoken")
const requestLogger = (request, response, next) => {
    logger.info("Method: ", request.method)
    logger.info("Path: ", request.path)
    logger.info("Body: ", request.body)
    logger.info("----")
    next()
}


const unknownEndpoint = (request, response)=>{
    response.status(404).send({error:"unkown endpoint"})
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        request.token = authorization.substring(7)// Extract the token from "Bearer "
    }
    next()
}
const userExtractor = (request, response, next) => {
    const token = request.token
    // check if there's a token

    if(!token){
        return response.status(401).json({
            error:"Token missing"
        })

    }
    const decodedToken = jwt.verify(token, process.env.SECRET)
    request.user = decodedToken.id
    next()
}
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)


    if (error.name === "CastError") {
        return response.status(400).send({error:"malformatted id"})

    }else if(error.name === "ValidationError") {
        return response.status(400).json({error: error.message})
    }else if (error.name === "JsonWebTokenError") {
        // console.log("Entering Here biko")
        return response.status(400).json({error:error.message})
    }

    next(error)
}


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}