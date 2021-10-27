import axiosClient from "./axiosClient";

class SearchUserApi {
  searchUser({ value, token }) {
    value = !value ? "" : value;
    const url = `user/search?value=${value}`;
    return axiosClient.get(url, {
      headers: { "x-access-token": token },
    });
  }
}

export default new SearchUserApi();
