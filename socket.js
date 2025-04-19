const {Server} = require("socket.io")


let io;
const initializeSocket = (server) => {
    io = new Server(server)

    io.on("connection" , (socket)=> {
        console.log("connected");

        socket.on("request" , ()=>{
            
        })
    })
}


module.exports = {initializeSocket}