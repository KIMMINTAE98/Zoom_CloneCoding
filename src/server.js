import express from "express";
import http from "http"
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000"); //ws://localhost:3000
//app.listen(3000, handleListen);

// express : http
// ws : websocket

// 한 서버에서 http & websocket protocol 둘다 동작시키기 (한 port에)
// http 서버 위에 websocket 서버 만듬

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketClose() {
    console.log("Disconnected from Browser X");
}

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anonymous";
    console.log("Connected to Browser O");
    socket.on("close", onSocketClose);
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch (message.type)
        {
            case "new_message":
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
                break;
            case "nickname":
                socket["nickname"] = message.payload;
                break;
        }
    });
});

server.listen(3000, handleListen);