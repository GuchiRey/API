<template>
  <div class="dashboard">
    <div class="container">
      <div class="search-bar-box">
        <input class="search-bar-input" @keyup="getUsers(1, this.search)" type="text" v-model="search" placeholder="Filter by email">
      </div>
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <td scope="col">Email</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user._id">
            <th scope="row"> {{ index + 1 }} </th>
            <td> {{ user.email }} </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination-box">
        <div v-for="p in numberOfPages" :key="p">
          <a :class="p == this.page ? 'pagination-item-active pagination-item' : 'pagination-item'" @click="getUsers(p, this.search), this.page = p">{{ p }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import userStore from "@/store/user";

export default {
  name: "dashboard-page",
  data() {
    return {
      page: 1,
      search: ""
    }
  },
  async created() {
    await this.getUsers(this.page, this.search);
  },
  methods: {
    ...mapActions(userStore, ["getUsers"]),
  },
  computed: {
    ...mapState(userStore, ["users", "numberOfPages", "usersLength"]),
  },
};
</script>
<style scoped>
.wallets-and-budgets {
  width: 100%;
}
.dashboard {
  background-color: var(--main-bg);
  height: calc(100vh - 4rem);
  color: var(--white);
  display: flex;
  justify-content: center;
}
table {
  width: 100%;
}
td {
  text-align: start;
}
th {
  width: 100px;
}
.search-bar-box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 25px 0;
}
.search-bar-input {
  background-color: rgb(61, 61, 61);
  border: none;
  border-radius: 16px;
  padding: 12px;
  color: white;
}
.search-bar-input:focus {
  outline: none;
}
.pagination-box {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  width: 100%;
}
.pagination-item {
  font-size: 18px;
  padding: 12px;
  cursor: pointer;
}
.pagination-item-active {
  border-radius: 16px;
  background: rgb(61, 61, 61);
  color: white;

}
</style>
