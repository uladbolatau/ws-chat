import Chat from "./chat/chat.js";

let chat = new Chat("body");

// const ws = new WebSocket("wss://echo.websocket.org");

// ws.onopen = (e) => {
//   console.log("onopen", e);

//   ws.onmessage = (e) => {
//     console.log(onmessage, e);
//   };

//   ws.send("test");

//   ws.onclosed = (e) => {
//     console.log(onmessage, e);
//   };
// };
