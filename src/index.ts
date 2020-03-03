import * as express from 'express'
import * as bodyparser from 'body-parser'
import { User } from './models/User'
import { Role } from './models/Role'; 
import { loggingMiddleware } from './middleware/logging-middleware'
import { sessionMiddleware } from './middleware/session-middleware'
import { userRouter } from './routers/user-router'
import { findUserByUsernameAndPassword} from './services/user-services'
import { reimbursementRouter } from './routers/reimbursement-router'

const app = express()

app.use('/', bodyparser.json())

app.use(loggingMiddleware)

app.use(sessionMiddleware)

app.use('/users', userRouter)
app.use('/reimbursements', reimbursementRouter)

app.post('/login', async (req,res)=>
{
  //step one, get data from user
  const {username, password} = req.body
  //step two, validate that data

  if(!username || !password){
      res.status(400).send('Invalid Credentials')

  } else {

      try {

          let user = await findUserByUsernameAndPassword(username,password)

          req.session.user = user// adds an object for us to use for auth

          res.status(200).json(user)// we do this for ourselves, when we start working on front end

      } catch(e){

          res.status(e.status).send(e.message)

      }

  }

})


   
  app.listen(2002, ()=>{
           console.log('app started on port 2002');
    })