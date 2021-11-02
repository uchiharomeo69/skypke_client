import Peer from "peerjs";

class PeerConnection {
  constructor(room, _id) {
    this.peer = new Peer(room + "" + _id);
  }
  listenCall() {
    return new Promise((resovle, rej) => {
      this.peer.on("call", (call) => {
        try {
          call.answer();
          call.on("stream", (remoteStream) => {
            resovle(remoteStream);
          });
        } catch (error) {
          rej(error);
        }
      });
    });
  }
  async call(friendId, stream) {
    this.peer.call(friendId, stream);
  }
}

export default PeerConnection;
