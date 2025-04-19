const http = require("http");
const app = require("./index")

const {initializeSocket} = require("./socket")

const server = http.createServer(app)

initializeSocket(server)

server.listen(3000 , () => {
    console.log("server is listening at port 3000")
})