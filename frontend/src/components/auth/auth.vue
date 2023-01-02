<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="form-container">
    <div class="login-page">
      <div class="form">
        <input
          v-model="userData.email"
          type="text"
          placeholder="Correo electrónico"
          class="email"
        />
        <input
          v-model="userData.password"
          type="password"
          placeholder="Contraseña"
          class="password"
        />
        <p v-if="this.errorMessage.length" class="error-message">
          {{ errorMessage }}
        </p>
        <AuthButton
          v-if="!isLogin"
          @click="collectUserData"
          :disabled="disableButton"
          text="Crear cuenta"
        />
        <AuthButton
          v-else
          @click="collectUserData"
          :disabled="disableButton"
          text="Iniciar sesión"
        />
        <AuthRedirectText
          text="¿Ya tenés una cuenta?"
          linkText="Iniciar sesión"
          route="/login"
          v-if="!isLogin"
        />
        <AuthRedirectText
          text="¿No tienes una cuenta?"
          linkText="Crear una cuenta"
          route="/signup"
          v-else
        />
      </div>
    </div>
  </div>
</template>
<script>
import AuthButton from "./authButton.vue";
import AuthRedirectText from "./authRedirectText.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "auth",
  props: {
    isLogin: Boolean,
  },
  data() {
    return {
      userData: { email: "", password: "" },
      errorMessage: "",
    };
  },
  computed: {
    disableButton() {
      return false;
    },
  },
  methods: {
    checkEmail(email) {
      // eslint-disable-next-line no-useless-escape
      let regex = new RegExp("[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,3}");
      return regex.test(email);
    },
    validateEmail() {
      const { email } = this.userData;
      if (!email.length) {
        this.errorMessage = "Por favor introduzca un correo electrónico";
        return;
      }
      if (email.length > 20) {
        this.errorMessage =
          "El correo electronico debe tener hasta 20 caracteres.";
        return;
      }
      if (!this.checkEmail(email)) {
        this.errorMessage = "Por favor introduzca un correo electrónico válido";
        return;
      }
    },
    validatePassword() {
      const { password } = this.userData;

      if (!password.length) {
        this.errorMessage = "Por favor introduzca una contraseña";
        return;
      }
      if (password.length < 6) {
        this.errorMessage =
          "La longitud de la contraseña debe ser de al menos 6 caracteres";
        return;
      }
    },
    collectUserData() {
      this.errorMessage = "";
      this.validateEmail();
      this.validatePassword();
      if (!this.errorMessage.length) {
        this.$emit("dataCollected", this.userData);
      }
    },
  },
  components: { AuthButton, AuthRedirectText },
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.app-name {
  color: var(--primary);
  font-family: "Gothic A1", sans-serif;
}

.error-message {
  border: 1px solid var(--red);
  background-color: var(--red);
  color: var(--white);
  font-weight: 500;
  margin: 0.4rem 0 !important;
  padding: 1rem 0.5rem;
}
.form-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--main-bg);
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
}

.login-page {
  width: 500px;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: var(--dark-gray);
  color: var(--white);
  max-width: 500px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form h2,
.form h3 {
  margin-bottom: 0.5rem;
}

.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: var(--soft-gray);
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}

.form .message {
  margin: 15px 0 0;
  color: var(--input-bg);
  font-size: 12px;
}

.form .register-form {
  display: none;
}
</style>
