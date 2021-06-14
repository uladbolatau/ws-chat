import { MONTH_NAMES, WS_STATES } from "./const/const.js";
import {
  TEXT_LOGOUT,
  TEXT_MSG_PLACEHOLDER,
  TEXT_MSG_SEND,
  TEXT_NICKNAME_BTN,
  TEXT_NICKNAME_PLACEHOLDER,
} from "./const/custom-text.js";
import {
  CLASSNAME_NICKNAME,
  CLASSNAMES_LAYOUT,
  CLASSNAMES_MENU,
  CLASSNAMES_MSG,
  CLASSNAMES_SEND,
} from "./const/class-names.js";

class ChatLayout {
  msgWrapper = undefined;
  wrapper = undefined;
  main = undefined;
  state = undefined;

  constructor(parentNode) {
    let main = document.createElement("main");
    let wrapper = document.createElement("div");

    wrapper.classList.add(CLASSNAMES_LAYOUT.wrapper);
    main.append(wrapper);
    this.main = main;
    this.wrapper = wrapper;

    document.querySelector(parentNode).append(main);
  }

  getNicknameLayout(loginCallback) {
    let nickname = document.createElement("div");
    let nicknameInput = document.createElement("input");
    let nicknameBtn = document.createElement("button");

    this.wrapper.innerHTML = "";
    nickname.classList.add(CLASSNAME_NICKNAME.wrapper);
    nicknameBtn.classList.add(CLASSNAME_NICKNAME.button);
    nicknameInput.classList.add(CLASSNAME_NICKNAME.input);
    nicknameInput.setAttribute("placeholder", TEXT_NICKNAME_PLACEHOLDER);
    nicknameInput.setAttribute("type", "text");
    nicknameBtn.setAttribute("type", "button");
    nicknameBtn.innerHTML = TEXT_NICKNAME_BTN;
    nickname.append(nicknameInput, nicknameBtn);
    this.wrapper.append(nickname);

    nicknameInput.onkeyup = (e) => {
      if (e.keyCode === 13 && !!nicknameInput.value.trim()) {
        loginCallback(nicknameInput.value.trim());
      }
    };

    nicknameBtn.onclick = () => {
      if (!!nicknameInput.value.trim()) {
        loginCallback(nicknameInput.value.trim());
      }
    };
  }

  messageSend(element) {
    nicknameInput.onkeyup = (e) => {
      if (e.keyCode === 13 && !!nicknameInput.value.trim()) {
        loginCallback(nicknameInput.value.trim());
      }
    };
  }

  getChatLayout(sendMessageCallback, context) {
    let msgWrapper = document.createElement("div");
    let sendMsg = document.createElement("div");
    let sendMsgInput = document.createElement("input");
    let sendMsgBtn = document.createElement("button");

    this.wrapper.innerHTML = "";
    msgWrapper.classList.add(CLASSNAMES_MSG.wrapper);
    sendMsg.classList.add(CLASSNAMES_SEND.wrapper);
    sendMsgInput.classList.add(CLASSNAMES_SEND.input);
    sendMsgBtn.classList.add(CLASSNAMES_SEND.button);
    sendMsgInput.setAttribute("placeholder", TEXT_MSG_PLACEHOLDER);
    sendMsgInput.setAttribute("type", "text");
    sendMsgBtn.setAttribute("type", "button");
    sendMsgBtn.innerHTML = TEXT_MSG_SEND;
    sendMsg.append(sendMsgInput, sendMsgBtn);
    this.wrapper.append(msgWrapper, sendMsg);
    this.msgWrapper = msgWrapper;

    sendMsgInput.onkeyup = (e) => {
      if (e.keyCode === 13 && !!sendMsgInput.value.trim()) {
        sendMessageCallback.call(context, sendMsgInput.value.trim());
        sendMsgInput.value = "";
      }
    };

    sendMsgBtn.onclick = () => {
      if (!!sendMsgInput.value.trim()) {
        sendMessageCallback.call(context, sendMsgInput.value.trim());
      }
    };
  }

  getMenuLayout(user, logoutCallback, wsState, context) {
    let menu = document.createElement("div");
    let nickname = document.createElement("div");
    let state = document.createElement("span");
    let logoutBtn = document.createElement("button");

    state.classList.add(CLASSNAMES_MENU.state);
    nickname.classList.add(CLASSNAMES_MENU.nickname);
    nickname.innerHTML = user;
    nickname.append(state);
    logoutBtn.classList.add(CLASSNAMES_MENU.logout);
    logoutBtn.setAttribute("type", "button");
    logoutBtn.innerHTML = TEXT_LOGOUT;
    menu.append(nickname, logoutBtn);
    this.wrapper.insertBefore(menu, this.msgWrapper);
    this.menu = menu;
    this.state = state;
    this.stateUpdate(wsState);

    logoutBtn.onclick = () => {
      this.wrapper.innerHTML = "";
      logoutCallback.call(context);
    };
  }

  stateUpdate(wsState) {
    this.menu.classList = "";
    this.menu.classList.add(CLASSNAMES_MENU.wrapper);
    this.menu.classList.add(CLASSNAMES_MENU.modificators[wsState]);
    this.state.innerHTML = WS_STATES[wsState];
  }

  getMsgLayout(msg) {
    let fragment = new DocumentFragment();

    msg.forEach((msg) => {
      let wrapper = document.createElement("div");
      let label = document.createElement("span");
      let time = document.createElement("span");
      let text = document.createElement("p");
      let msgTime = new Date(msg.time);

      label.innerHTML = msg.from;
      time.innerHTML = `[${this.addZeroToTime(
        msgTime.getHours()
      )}:${this.addZeroToTime(msgTime.getMinutes())}:${this.addZeroToTime(
        msgTime.getSeconds()
      )}, ${msgTime.getDate()} ${
        MONTH_NAMES[msgTime.getMonth()]
      } ${msgTime.getFullYear()}]`;
      text.innerHTML = msg.message;
      time.classList.add(CLASSNAMES_MSG.time);
      text.classList.add(CLASSNAMES_MSG.text);
      label.classList.add(CLASSNAMES_MSG.label);
      wrapper.classList.add(CLASSNAMES_MSG.msg);
      wrapper.append(label, time, text);
      fragment.append(wrapper);
    });

    this.msgWrapper.prepend(fragment);
  }

  addZeroToTime(num) {
    return ("0" + num).slice(-2);
  }
}

export default ChatLayout;
