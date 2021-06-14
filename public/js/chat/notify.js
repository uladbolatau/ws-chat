import { FAVICON_PATH, NOTIFY__GRANTED } from "./const/const.js";

class ChatNotify {
  constructor() {
    Notification.requestPermission().catch((data) => console.error(data));
  }

  message(msg) {
    console.log(msg);
    if (!document.hasFocus()) {
      new Notification(msg.from, {
        body: msg.message,
        icon: FAVICON_PATH,
      });
    }
  }
}

export default ChatNotify;
