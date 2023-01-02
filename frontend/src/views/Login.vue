<template>
  <Auth :isLogin="true" @dataCollected="loginUser" ref="authCompoment" />
</template>
<script>
import Auth from "@/components/auth/auth.vue";
import authStore from "@/store/auth";
import { mapActions } from "pinia";
export default {
  name: "loginPage",
  components: { Auth },
  methods: {
    ...mapActions(authStore, ["login"]),
    async loginUser(credentials) {
      // eslint-disable-next-line no-useless-catch
      try {
        await this.login(credentials);
        this.$router.push({ name: "dashboard" });
      } catch (e) {
        this.$refs.authCompoment.errorMessage = e.response.data.result
        throw e;
      }
    },
  },
};
</script>
