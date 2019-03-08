<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <nav-menu params="route: route"></nav-menu>
      </div>
      <div class="col-sm-9">
        <router-view @authenticated="setAuthenticated"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from "./nav-menu";
import store from "../store/index.js";

export default {
  components: {
    "nav-menu": NavMenu
  },
  data() {
    return {
      mockAccount: {
        username: "maylor",
        password: "password"
      }
    };
  },
  mounted() {
    console.log("app mounted");
    // this.eventHub.$on("authenticated", this.isAuthenticated);
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    isAuthenticated() {
      this.setAuthenticated(true);
      console.log("isAuthenticated", this.authenticated);
    }
  }
};
</script>

<style>
body {
  background-color: #f0f0f0;
}
h1 {
  padding: 0;
  margin-top: 0;
}
#app {
  width: 1024px;
  margin: auto;
}
</style>
