import { URL, LS_NICKNAME } from "./const/const.js";
import ChatNotify from "./notify.js";
import ChatLayout from "./layout.js";

class Chat {
  layout = undefined;
  notify = undefined;
  ws = undefined;

  constructor(parentNode) {
    this.layout = new ChatLayout(parentNode);
    this.notify = new ChatNotify();

    if (!this.getUser()) {
      this.login();
    } else {
      this.connect();
    }
  }

  connect() {
    this.ws = new WebSocket(URL);
    this.ws.onopen = (event) => {
      console.log("onopen", this.ws.readyState, event);
      this.layout.getChatLayout(this.send, this);
      this.layout.getMenuLayout(
        this.getUser(),
        this.logout,
        this.ws.readyState,
        this
      );
    };

    this.onmessage();
    this.onerror();
    this.onclose();
  }

  disconnect() {
    this.ws.close();
  }

  onerror() {
    this.ws.onerror = (event) => {
      console.log("onerror", this.ws.readyState, event);
      this.layout.stateUpdate(5);
    };
  }

  onclose() {
    this.ws.onclose = (event) => {
      console.log("onclose", this.ws.readyState, event);
      this.layout.stateUpdate(this.ws.readyState);
    };
  }

  login() {
    this.layout.getNicknameLayout((nickname) => {
      this.setUser(nickname);
      this.connect();
    });
  }

  logout() {
    this.removeUser();
    this.disconnect();
    this.login();
  }

  onmessage() {
    this.ws.onmessage = (event) => {
      console.log("onmessage", this.ws.readyState, event);
      this.layout.getMsgLayout(JSON.parse(event.data));
      this.notify.message(JSON.parse(event.data)[0]);
    };
  }

  send(msgText) {
    let msg = {
      from: this.getUser(),
      message: msgText,
    };

    this.ws.send(JSON.stringify(msg));
  }

  getUser() {
    return localStorage.getItem(LS_NICKNAME);
  }

  setUser(value) {
    return localStorage.setItem(LS_NICKNAME, value);
  }

  removeUser(value) {
    localStorage.removeItem(LS_NICKNAME);
  }
}

export default Chat;
