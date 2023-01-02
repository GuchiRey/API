import axios from "./api";

export default {
  getUsers(page, search) {
    return axios.get(`/api/user/users?page=${page}&search=${search}`).then((res) => {
      return res.data
    });
  },
};
