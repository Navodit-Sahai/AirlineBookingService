const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const {PORT}=require('./config/serverConfig');
const ApiRoutes=require('./routes/index');
const db=require('./models/index');

const setupAndStartServer=()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',ApiRoutes);
    app.listen(PORT,()=>{
        console.log(`server started at ${PORT}`);
        console.log(process.env.FLIGHT_SERVICE_PATH);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }
    })
}
setupAndStartServer();