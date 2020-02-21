import * as express from 'express'
import * as bodyparser from 'body-parser'
import { loggingMiddleware } from './middleware/logging-middleware'
import { userRouter } from './routers/user-router'
import { sessionMiddleware } from './middleware/session-middleware'
import { HttpError } from './errors/HttpError'
import { BadCredentialsError } from './errors/BadCredentialsError'

const app = express()

app.use('/', bodyparser.json())

app.use(sessions)

app.use('/user', userRouter)

app.post('/login', (req,res)=>{
    const {username, password} = req.body
    if(!username || !password){
        res.status(400).send('Username and Password are missing')
    } else {
        try {
           let user = findUserByUsernameAndPassword(username, password)
             req.session.user = user
             res.status(200).json(user)
        } catch(e){
          res.status(e.status).send(e.message)
        }
      }
   })

   function findUserByUsernameAndPassword(username:string, password:string){
        for(let user of users){
        if(user.username === username && user.password === password){
            return user
          }
       }
          throw new BadCredentialsError()
       }
       
       app.listen(2002, ()=>{
           console.log('app started on port 2002');
       })