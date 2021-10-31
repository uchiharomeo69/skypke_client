import axiosClient from "./axiosClient";

class UserApi {
  login(params) {
    const url = "/user/login";
    return axiosClient.post(url, params);
  }
  getListFriend(token) {
    const url = `/conversation/friend`;
    return axiosClient.get(url, { headers: { "x-access-token": token } });
  }
  getInfor(token) {
    const url = "user";
    return axiosClient.get(url, { headers: { "x-access-token": token } });
  }
  register(params) {
    return axiosClient.post("/user", params);
  }
}

export default new UserApi();
