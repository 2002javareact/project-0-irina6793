import * as express from 'express'
import * as bodyparser from 'body-parser'
import { sessions } from './middleware/sessions'
const app = express()

app.use('/', bodyparser.json())

app.use(sessions)

app.use('/user', userRoutes)

app.post('/login', (req,res)=>{
    const {username, password} = req.body
    if(!username || !password){
        res.status(400).send('Please Include Username and Password')
    } else {
        try {
           let user = findUserByUsernameAndPassword(username,password)
             req.session.user = user
             res.status(200).json(user)
} catch(e){

    res.status(e.status).send(e.message)

}

}

})

