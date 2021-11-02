import { client } from "./socket";

class SendToServer {
  connectServer(_id) {
    return new Promise((resolve) => {
      client.emit("connectServer", _id, (data) => {
        resolve(data);
      });
    });
  }
  connectConversation(conversation) {
    return new Promise((resolve) => {
      client.emit("join", conversation, (data) => {
        resolve({ _id: conversation._id, online: data });
      });
    });
  }
  sendMessage(payload, cb) {
    client.emit("sendMessage", payload, ({ conversation }) => {
      cb(conversation);
    });
  }
  call(payload) {
    return new Promise((resolve) => {
      client.emit("call", payload, (data) => {
        resolve(data);
      });
    });
  }

  calloff(payload) {
    return new Promise((resolve) => {
      client.emit("calloff", payload, (data) => {
        resolve(data);
      });
    });
  }
  callpopout(payload) {
    return new Promise((resolve) => {
      client.emit("callpopout", payload, (data) => {
        resolve(data);
      });
    });
  }
  acceptcall(payload) {
    return new Promise(() => {
      client.emit("acceptCall", payload);
    });
  }
  joinCallRoom(payload) {
    return new Promise(() => {
      client.emit("joincallroom", payload);
    });
  }
  createGroup(payload) {
    return new Promise((resolve) => {
      client.emit("createGroup", payload, (data) => {
        resolve(data);
      });
    });
  }
  focusIn(payload) {
    return new Promise((resolve) => {
      client.emit("focusIn", payload, (data) => {
        resolve(data);
      });
    });
  }
  focusOut(payload) {
    return new Promise((resolve) => {
      client.emit("focusOut", payload, (data) => {
        resolve(data);
      });
    });
  }
}
export default new SendToServer();
