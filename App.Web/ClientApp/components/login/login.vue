<template>
  <div id="login">
    <h1>Login</h1>
    <b-form-group id="username" label="Username" label-for="username">
      <b-form-input
        id="username"
        type="text"
        v-model="input.username"
        required
        placeholder="Username"
      />
    </b-form-group>
    <b-form-group id="password" label="Password" label-for="password">
      <b-form-input
        id="password"
        type="text"
        v-model="input.password"
        required
        placeholder="Password"
      />
    </b-form-group>
    <button type="button" v-on:click="login()" class="btn btn-primary">Login</button>
  </div>
</template>

<script>
import store from "../../store/index.js";
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      debugger;
      this.$store.dispatch("doLogin");

      if (this.input.username != "" && this.input.password != "") {
        if (
          this.input.username == this.$parent.mockAccount.username &&
          this.input.password == this.$parent.mockAccount.password
        ) {
          this.eventHub.$emit("authenticated", true);
          this.$router.replace({ name: "home" });
        } else {
          console.log("The username and / or password is incorrect");
        }
      } else {
        console.log("A username and password must be present");
      }
    }
  },
  mounted() {
    console.log("login mounted");
  }
};
</script>

<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>
