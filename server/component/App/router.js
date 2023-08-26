const authRoute = require('../auth/router');
const userRoute = require('../user/router');
const groupRoute = require('../group/router');
const groupPost = require('../groupPost/router');
const presentationRoute = require('../presentation/router');
const authMiddleware = require('../auth/middleware');


module.exports =(app)=>{
    app.get('/',(req,res)=>{
        res.send({message:'Node.js and express REST API'});
    });
    app.use('/api/auth', authRoute);
    app.use('/api/user', userRoute);
    app.use('/api/group', authMiddleware ,  groupRoute);
    app.use('/api/group-post', authMiddleware ,  groupPost);
    app.use('/api/presentation', authMiddleware , presentationRoute);
}
