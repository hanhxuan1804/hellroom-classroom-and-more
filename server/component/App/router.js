const authRoute = require('../auth/router');
const userRoute = require('../user/router');
const groupRoute = require('../group/router');

module.exports =(app)=>{
    app.get('/',(req,res)=>{
        res.send({message:'Node.js and express REST API'});
    });
    app.use('/api/auth', authRoute);
    app.use('/api/user', userRoute);
    app.use('/api/group', groupRoute);
}
