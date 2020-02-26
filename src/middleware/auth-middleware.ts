export const authAdminMiddleware = (req,res)=>{
     if(!req.session.user){
         res.status(401).send('Please Login')
     }else if(req.session.user.role === 'Admin'){
     } else {
          res.status(403).send('This page is unauthorized')
     }
  } 

export const authUserMiddleware = (req,res) => {
     if(!req.session.user){
         res.status(401).send('Please Login')
     }else if(req.session.user.role === 'Admin' || req.session.user.id === +req.params.id ){
     }else {
        res.status(403).send('This page is unauthorized')
     }
   }

 export const authFactory = (roles:string[])=>{
     return(req,res,next)=>{
         if(!req.session.user){
             res.status(401).send('Please Login')
         }else if(roles.includes('Everyone')){
           next()
         }else{
             let allowed = false
             for(let role of roles){
                 if(req.session.user.role === role){
                     allowed = true
                next()
             }
          }
             if(!allowed)
                res.status(401).send('This page has expired')
          }
        } 
      }
    export const authCheckId = (req,res)=>{
          if(req.session.user.id === +req.params.id){
          }else{
            res.status(401).send('This page has expired')
          }
      }