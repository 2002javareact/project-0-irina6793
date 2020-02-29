export const authFactory = (roles:string[])=>{
     return(req,res,next)=>{
         if(!req.session.user){
             res.status(401).send('Please Login')
           }else{
            let allowed = false
            for (let role of roles) {
              //console.log(`hello im the role check me ${req.session.user.role}`);
              
              if(req.session.user.role === role){
                allowed = true;
                next();
              }
            }
            if (!allowed) {
              res.status(401).send('The incoming token has expired')
          }
       }
     } 
    }
    export const authCheckId = (req,res,next)=>{

      console.log(`This is auth fun iam   ${req.session.user.role} `);
      
          if(req.session.user.role === "Admin" || req.session.user.role === "Finance-Manager")
          {
            next();
          } else if (req.session.user.id === +req.params.id) {
            next();
          }else{
            res.status(403).send('This page has expired')
          }
      }


