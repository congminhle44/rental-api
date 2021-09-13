const dotenv = require('dotenv');
dotenv.config();

let mongoUrl,port;

switch(process.env.NODE_ENV){
    case "local":
        port=process.env.LOCAL_PORT;
        mongoUrl=process.env.LOCAL_URL;
        break;
    case "staging":
        port=process.env.STAGING_PORT;
        mongoUrl=process.env.STAGING_URL;
        break;
}

module.exports={
    mongoUrl,port
}