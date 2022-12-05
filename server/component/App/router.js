const authRoute = require('../auth/router');

module.exports =(app)=>{
    app.get('/',(req,res)=>{
        res.send({message:'Node.js and express REST API'});
    });
    app.use('/api/auth', authRoute);
}
