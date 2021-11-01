import { client } from "./socket";

class RecieveFromServer {
  async messageFromServer() {
    return new Promise((resolve) => {
      client.on("getMessage", (data) => {
        resolve(data);
      });
    });
  }
  async someoneConnect() {
    return new Promise((resolve) => {
      client.on("someoneConnect", (data) => {
        resolve(data);
      });
    });
  }
  async someoneOnline() {
    return new Promise((resolve) => {
      client.on("someoneOnline", (data) => {
        resolve(data);
      });
    });
  }
  async someoneCall() {
    return new Promise((resolve) => {
      client.on("someoneCall", (data) => {
        resolve(data);
      });
    });
  }

  // bi tu choi
  async serveroffcall() {
    return new Promise((resolve) => {
      client.on("serveroffcall", (data) => {
        resolve(data);
      });
    });
  }

  // duoc accept
  async friendacceptcall() {
    return new Promise((resolve) => {
      client.on("friendAcceptCall", (data) => {
        resolve(data);
      });
    });
  }

  // khi nhan dc cai nay thi share stream den data
  async sharecall() {
    return new Promise((resolve) => {
      client.on("sharecall", (data) => {
        resolve(data);
      });
    });
  }

  // listen group create
  async gtcreate() {
    return new Promise((resolve) => {
      client.on("groudCreate", (data) => {
        resolve(data);
      });
    });
  }
}
export default new RecieveFromServer();
