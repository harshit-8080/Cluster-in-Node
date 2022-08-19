const express = require("express");
const cluster = require("cluster");
const os = require("os");

const app = express();


app.get("/home", (req, res)=>{
    res.status(200).send({"project":"cluster project"});
})

app.get("/contact", (req, res)=>{
    res.status(200).send({"project":"cluster project"});
})


if(cluster.isMaster){
    console.log("master process started");
    const WORKERS = os.cpus();
    for(let i = 0; i < WORKERS.length; i++){
        cluster.fork();
    }
}

else {
    console.log("slave process started");
    console.log(`process id = ${process.pid}`);

    app.listen(3000, ()=> {
        console.log("server started at 3000 for cluster project");
    })
}

