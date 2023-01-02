<template>
  <div class="nav-bar">
    <div class="app-name">API CONEXA</div>
    <div class="links-container">
      <ul class="links">
        <li class="link" @click="signOff">Logout</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import authStore from "@/store/auth";
export default {
  name: "header",
  data() {
    return {
      showWelcomeMessage: true,
      wallets: [],
    };
  },
  methods: {
    ...mapActions(authStore, ["logout"]),
    async signOff(){
      try {
        await this.logout();
        this.$router.push({ name: "login" });
      } catch (e) {
        throw e;
      }
    }

  },
};

</script>
<style scoped>
.nav-bar {
  background-color: var(--dark-gray);
  width: 100%;
  height: 4rem;
  color: var(--white);
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: 700;
}
.links {
  display: flex;
  list-style-type: none;
  gap: 1rem;
  margin-bottom: 0;
}
.links-container {
  display: flex;
  align-items: center;
}
.app-name {
  color: var(--primary);
  font-family: "Gothic A1", sans-serif;
  font-size: 1.7rem;
}

.link {
  cursor: pointer;
}

.link:hover {
  color: var(--primary);
}
</style>
