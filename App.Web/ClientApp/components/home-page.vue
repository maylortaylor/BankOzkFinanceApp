<template>
  <div>
    <h1>Savings Goals</h1>

    <p>(Data is coming from SampleDataController.cs)</p>

    <div v-if="!savingsGoals" class="text-center">
      <p>
        <em>Loading...</em>
      </p>
      <h1>
        <icon icon="spinner" pulse/>
      </h1>
    </div>
    <div class="button-group">
      <button @click="getSavingsGoals">Refresh</button>
      <button @click="enableAddMode" v-if="!addingGoal && !selectedSavingsGoal">Add</button>
    </div>
    <SavingsGoal
      v-if="selectedSavingsGoal || addingGoal"
      :savingsGoal="selectedSavingsGoal"
      @unselect="unselect"
      @heroChanged="save"
    ></SavingsGoal>

    <template v-if="savingsGoals">
      <b-list-group>
        <b-list-group-item
          @click="onSelect(savingsGoal)"
          :class="index % 2 == 0 ? 'bg-white' : 'bg-light'"
          v-for="(savingsGoal, index) in savingsGoals"
          :key="index"
        >
          <b-badge variant="primary" pill>{{savingsGoal.createdAt}}</b-badge>
          <br>
          <h3>
            <strong>{{ savingsGoal.title }}</strong>
          </h3>
          <h6>Target Amount:</h6>
          {{ savingsGoal.targetAmount }}
          <h6>Amount Saved:</h6>
          {{ savingsGoal.amountSaved }}
          <br>
          <b-progress
            variant="success"
            :value="savingsGoal.amountSaved"
            :max="savingsGoal.targetAmount"
            show-progress
            animated
          />
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
import SavingsGoal from "./savings-goal";
export default {
  computed: {
    totalPages: function() {
      return Math.ceil(this.total / this.pageSize);
    }
  },
  components: {
    SavingsGoal
  },
  data() {
    return {
      selectedSavingsGoal: null,
      addingGoal: false,
      savingsGoals: null,
      total: 0,
      pageSize: 3,
      currentPage: 1,
      counter: 0,
      max: 9000
    };
  },
  methods: {
    async loadPage(page) {
      // ES2017 async/await syntax via babel-plugin-transform-async-to-generator
      // TypeScript can also transpile async/await down to ES5
      this.currentPage = page;

      try {
        var from = (page - 1) * this.pageSize;
        var to = from + this.pageSize;
        return sGoalService.getSampleData(from, to).then(response => {
          this.savingsGoals = response.data.savingsGoals;
          this.total = response.data.total;
        });
      } catch (err) {
        window.alert(err);
        console.log(err);
      }
    },
    getSavingsGoals(page) {
      this.currentPage = page;
      var from = (page - 1) * this.pageSize;
      var to = from + this.pageSize;

      this.savingsGoals = [];
      this.clear();

      return sGoalService.getSampleData(from, to).then(response => {
        this.savingsGoals = response.data.savingsGoals;
        this.total = response.data.total;
      });
    },
    save(arg) {
      const sGoal = arg.savingsGoal;
      console.log("savings goal changed", sGoal);
      if (arg.mode === "add") {
        heroService.addHero(sGoal).then(() => this.heroes.push(sGoal));
      } else {
        heroService.updateHero(sGoal).then(() => {
          const index = this.heroes.findIndex(h => sGoal.title === h.title);
          this.heroes.splice(index, 1, hero);
        });
      }
    },
    deleteSavingsGoal(sGoal) {
      return sGoalService.deleteHero(sGoal).then(() => {
        this.savingsGoals = this.savingsGoals.filter(h => h !== sGoal);
        if (this.selectedSavingsGoal === sGoal) {
          this.selectedSavingsGoal = null;
          this.clear();
        }
      });
    },
    enableAddMode() {
      this.addingHero = true;
      this.selectedSavingsGoal = null;
    },
    unselect() {
      this.addingGoal = false;
      this.selectedSavingsGoal = null;
    },
    clear() {
      this.addingGoal = false;
      this.selectedSavingsGoal = null;
    },
    onSelect(sGoal) {
      this.selectedSavingsGoal = sGoal;
    }
  },

  async created() {
    this.loadPage(1);
  }
};
</script>

<style>
</style>
