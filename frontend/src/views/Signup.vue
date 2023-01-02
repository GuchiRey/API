<template>
  <Auth @dataCollected="createAccount" ref="authCompoment" />
</template>
<script>
import Auth from "@/components/auth/auth.vue";
import authStore from "@/store/auth";
import { mapActions } from "pinia";
export default {
  name: "signup-page",
  components: { Auth },
  methods: {
    ...mapActions(authStore, ["signUp"]),
    async createAccount(data) {
      try {
        await this.signUp(data);
        this.$router.push({ name: "dashboard" });
      } catch (e) {
        this.$refs.authCompoment.errorMessage = e.response.data.message
        throw e;
      }
    },
  },
};
</script>
