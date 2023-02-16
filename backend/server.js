const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting downmthe  server dut to Uncaught Exception`);
    process.exit(1);
})


//config
dotenv.config({path:"backend/config/.env"});


//connecting to database
connectDatabase()




const server = app.listen(process.env.PORT,()=>{
    console.log("server is working on  https://localhost:${process.env.PORT}");
});


//Unhendled Promise Rejection
process.on("unhandledRejection", (err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});