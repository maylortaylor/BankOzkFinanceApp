<template>
  <div class="main-nav">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" @click="toggleCollapsed">
        <span class="navbar-toggler-icon"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

      <router-link class="navbar-brand" to="/">
        <icon :icon="['fab', 'microsoft']"/>ASP.NET Core with Vue.js 2
      </router-link>
      <router-link
        v-if="authenticated"
        class="navbar-brand"
        to="/login"
        v-on:click.native="logout()"
        replace
      >Logout</router-link>

      <transition name="slide">
        <div :class="'collapse navbar-collapse' + (!collapsed ? ' show':'')" v-show="!collapsed">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" v-for="(route, index) in routes" :key="index">
              <router-link :to="route.path" exact-active-class="active">
                <icon :icon="route.icon" class="mr-2"/>
                <span>{{ route.display }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </transition>

      <div v-if="authenticated" class="action-area">
        <b-container>
          <b-row>
            <b-col>
              <b-button @click="getSavingsGoals" type="button" variant="outline-primary">Refresh</b-button>
            </b-col>
            <b-col>
              <b-button
                v-if="!addingGoal && !selectedSavingsGoal"
                @click="enableAddMode"
                type="button"
                variant="outline-success"
              >Add</b-button>
            </b-col>
          </b-row>
        </b-container>

        <SavingsGoal
          v-if="(selectedSavingsGoal || addingGoal)"
          :savingsGoal="selectedSavingsGoal"
          @unselect="unselect"
          @savingsGoalChanged="save"
        ></SavingsGoal>
      </div>
    </nav>
  </div>
</template>

<script>
import { routes } from "../router/routes";
import sGoalService from "../services/savingsGoal.service.js";
import SavingsGoal from "./savings-goal";

export default {
  data() {
    return {
      routes,
      authenticated: false,
      selectedSavingsGoal: null,
      addingGoal: false,
      savingsGoals: null,
      collapsed: true
    };
  },
  components: {
    SavingsGoal
  },
  async created() {
    this.loadPage();
  },
  mounted() {
    if (!this.authenticated) {
      console.log("nav - isAuthenticated", this.authenticated);
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    async loadPage() {
      console.log("nav loaded");
      this.eventHub.$on("selected-sgoal", this.onSelectedSavingsGoal);
    },
    logout() {
      this.authenticated = false;
    },
    onSelectedSavingsGoal(sGoal) {
      console.log("on selected sGoal", sGoal);
      this.selectedSavingsGoal = sGoal;
    },
    toggleCollapsed: function(event) {
      this.collapsed = !this.collapsed;
    },
    getSavingsGoals(page) {
      this.currentPage = page;
      var from = (page - 1) * this.pageSize;
      var to = from + this.pageSize;

      this.savingsGoals = [];
      this.clear();

      return sGoalService.getSampleData(from, to).then(response => {
        this.eventHub.$emit("refreshed-data", response);
        this.savingsGoals = response.data.savingsGoals;
        this.total = response.data.total;
      });
    },
    save(arg) {
      const sGoal = arg.savingsGoal;
      console.log("savings goal changed", sGoal);
      if (arg.mode === "add") {
        sGoalService.addSavingsGoal(sGoal).then(r => {
          this.savingsGoals = r;
          this.eventHub.$emit("updated-goal-list", this.savingsGoals);
        });
      } else {
        sGoalService.updateSavingsGoal(sGoal).then(() => {
          const index = this.savingsGoal.findIndex(
            h => sGoal.title === h.title
          );
          this.savingsGoal.splice(index, 1, sGoal);
        });
      }
    },
    enableAddMode() {
      this.addingGoal = true;
      this.selectedSavingsGoal = null;
    },
    unselect() {
      this.addingGoal = false;
      this.selectedSavingsGoal = null;
    },
    clear() {
      this.addingGoal = false;
      this.selectedSavingsGoal = null;
    }
  }
};
</script>

<style scoped>
.action-area {
  padding-top: 20px;
}
.navbar {
  overflow: auto;
}

.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.35s;
}
.slide-enter,
.slide-leave-to {
  max-height: 0px;
}

.slide-enter-to,
.slide-leave {
  max-height: 20em;
}
</style>
