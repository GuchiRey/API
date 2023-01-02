/* eslint-disable no-useless-catch */
import { defineStore } from "pinia";
import user from "../service/user";

const userStore = defineStore("user", {
  state: () => {
    return {
      users: [],
      usersLength: null,
      numberOfPages: 1
    };
  },
  actions: {
    async getUsers(page, search) {
      try {
        let { users, numberOfPages, usersLength } = await user.getUsers(page, search)
        this.users = users
        this.numberOfPages = numberOfPages
        this.usersLength = usersLength
      } catch (e) {

      }
    }
  }
});

export default userStore;
