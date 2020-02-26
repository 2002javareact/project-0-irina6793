import * as express from 'express'
import * as bodyparser from 'body-parser'
import { loggingMiddleware } from './middleware/logging-middleware'
import { userRouter } from './routers/user-router'
import { reimbursementRouter } from './routers/reimbursement-router'
import { sessionMiddleware } from './middleware/session-middleware'
import { findUserByUsernameAndPassword} from './services/user-services'

const app = express()

app.use('/', bodyparser.json())

app.use(loggingMiddleware)

app.use(sessionMiddleware)

app.use('/users', userRouter)
app.use('/reimbursemnts', reimbursementRouter)

app.post('/login', async (req,res)=>{
    const {username, password} = req.body
    if(!username || !password){
        res.status(400).send('Username and Password are missing')
    } else {
        try {
           let user = await findUserByUsernameAndPassword(username, password)
             req.session.user = user
             res.status(200).json(user)
        } catch(e){
          //console.log(e);
          
          res.status(e.status).send(e.message)
        }
      }
   })   
       app.listen(2002, ()=>{
           console.log('app started on port 2002');
    })