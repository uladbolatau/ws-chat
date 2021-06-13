import { FAVICON_PATH, NOTIFY__GRANTED } from "./const/const.js";

class ChatNotify {
  constructor() {
    Notification.requestPermission().catch((data) => console.error(data));
  }

  message(msg) {
    setTimeout(() => {
      if (!document.hasFocus()) {
        new Notification(msg.from, {
          body: msg.message,
          icon: FAVICON_PATH,
        });
      }
    }, 1000);
  }
}

export default ChatNotify;
