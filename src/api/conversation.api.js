import axios from "axios";
import axiosClient from "./axiosClient";

class conversationApi {
  // list conversation cua user
  getConversation(token) {
    return axiosClient.get("/conversation/user", {
      headers: { "x-access-token": token },
    });
  }
  getListMessage(conversationId, token, skip) {
    if (!conversationId)
      return {
        data: [],
      };
    return axiosClient.get(`/message/${conversationId}?skip=${skip}`, {
      headers: { "x-access-token": token },
    });
  }
  setLastSeen(memberId, token) {
    return axiosClient.post(
      `/member/lastseen/${memberId}`,
      {},
      {
        headers: { "x-access-token": token },
      }
    );
  }
  createGroup(listMember, token) {
    return axios.post(
      "/conversation/group",
      { listMember },
      { headers: { "x-access-token": token } }
    );
  }
}

export default new conversationApi();
