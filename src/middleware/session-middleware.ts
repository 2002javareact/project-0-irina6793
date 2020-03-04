import * as session from 'express-session'

const sessionConfig = {
    secret: 'secret',
    cookie: {secure:false},
    resave:false,
    saveUninitialized:false
}

export const sessionMiddleware = session(sessionConfig)//return
// a function that looks like (req, res, next) => {
// it somehow attaches an object to the request
// and then
// next()
//}