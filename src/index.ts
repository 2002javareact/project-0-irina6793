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

app.post('/login', async (req,res)=>{
    const {username, password} = req.body
    console.log(username, password)
    if(!username || !password){
        res.status(400).send('Username and Password are missing')
    } else {
        try {
           let user = await findUserByUsernameAndPassword(username, password)
             req.session.user = user
             res.status(200).json(user)
        } catch(e){
          console.log(e)
          res.status(e.status).send(e.message)
        }
      }
   })   
  app.listen(2002, ()=>{
           console.log('app started on port 2002');
    })