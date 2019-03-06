<template>
  <div>
    <h1>Savings Goals</h1>

    <p>Press [Refresh] to get sample data (from SampleDataController.cs)</p>

    <div v-if="!savingsGoals" class="text-center">
      <p>
        <em>Loading...</em>
      </p>
      <h1>
        <icon icon="spinner" pulse/>
      </h1>
    </div>

    <template v-if="savingsGoals">
      <b-list-group>
        <b-list-group-item
          @click="onSelect(savingsGoal)"
          :class="index % 2 == 0 ? 'bg-white' : 'bg-light'"
          v-for="(savingsGoal, index) in savingsGoals"
          :key="index"
        >
          <h3>
            <strong>{{ savingsGoal.title }}</strong>
          </h3>
          <h4>
            <p>{{ savingsGoal.description }}</p>
          </h4>
          <b-badge variant="primary" pill>{{savingsGoal.id}}</b-badge>
          <br>
          <b-badge variant="secondary" pill>{{savingsGoal.createdAt}}</b-badge>
          <br>
          <h6>Target Amount:</h6>
          ${{ savingsGoal.targetAmount }}
          <h6>Amount Saved:</h6>
          ${{ savingsGoal.amountSaved }}
          <br>
          <b-progress :max="savingsGoal.targetAmount" height="2rem">
            <b-progress-bar :value="savingsGoal.amountSaved" variant="success" animated>
              Progress:
              <strong>${{ savingsGoal.amountSaved }} / ${{ savingsGoal.targetAmount }}</strong>
            </b-progress-bar>
          </b-progress>
        </b-list-group-item>
      </b-list-group>

      <nav aria-label="...">
        <ul class="pagination justify-content-center">
          <li :class="'page-item' + (currentPage == 1 ? ' disabled' : '')">
            <a class="page-link" href="#" tabindex="-1" @click="loadPage(currentPage - 1)">Previous</a>
          </li>
          <li
            :class="'page-item' + (n == currentPage ? ' active' : '')"
            v-for="(n, index) in totalPages"
            :key="index"
          >
            <a class="page-link" href="#" @click="loadPage(n)">{{n}}</a>
          </li>
          <li :class="'page-item' + (currentPage < totalPages ? '' : ' disabled')">
            <a class="page-link" href="#" @click="loadPage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
    </template>
  </div>
</template>

<script>
import sGoalService from "../services/savingsGoal.service.js";

export default {
  computed: {
    totalPages: function() {
      return Math.ceil(this.total / this.pageSize);
    }
  },
  data() {
    return {
      selectedSavingsGoal: null,
      savingsGoals: null,
      total: 0,
      pageSize: 3,
      currentPage: 1,
      max: 9000
    };
  },
  methods: {
    async loadPage(page) {
      console.log("home page loaded");
      this.eventHub.$on("refreshed-data", this.addDataFromRefreshEvent);
      this.eventHub.$on("updated-goal-list", this.updatedGoalList);
      this.currentPage = page;
      this.savingsGoals = [];

      try {
        var from = (page - 1) * this.pageSize;
        var to = from + this.pageSize;
        // return sGoalService.getSampleData(from, to).then(response => {
        //   console.log(response);
        //   this.savingsGoals = response.data.savingsGoals;
        //   this.total = response.data.total;
        // });
        return sGoalService.getSavingsGoals().then(all => {
          console.log("get all savings goals", all);
          if (all) {
            this.savingsGoals = all;
            this.total = all.length;
          }
        });
      } catch (err) {
        window.alert(err);
        console.log(err);
      }
    },
    updatedGoalList(updatedGoals) {
      this.savingsGoals = updatedGoals.map(x => {
        x.id = x.id;
        x.title = x.title;
        x.targetAmount = parseInt(x.targetAmount);
        x.amountSaved = parseInt(x.amountSaved);
        return x;
      });
    },
    addDataFromRefreshEvent(resp) {
      console.log("refresh event", resp);
      this.total = resp.data.total;
      this.savingsGoals = resp.data.savingsGoals;
    },
    deleteSavingsGoal(sGoal) {
      return sGoalService.deleteSavingsGoal(sGoal).then(() => {
        this.savingsGoals = this.savingsGoals.filter(h => h !== sGoal);
        if (this.selectedSavingsGoal === sGoal) {
          this.selectedSavingsGoal = null;
          this.clear();
        }
      });
    },
    onSelect(sGoal) {
      this.selectedSavingsGoal = sGoal;
      this.eventHub.$emit("selected-sgoal", this.selectedSavingsGoal);
    }
  },
  async created() {
    this.loadPage(1);
  }
};
</script>

<style>
</style>
