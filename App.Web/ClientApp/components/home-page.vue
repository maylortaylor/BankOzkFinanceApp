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
    <template v-if="savingsGoals">
      <b-list-group>
        <b-list-group-item
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
export default {
  computed: {
    totalPages: function() {
      return Math.ceil(this.total / this.pageSize);
    }
  },
  data() {
    return {
      savingsGoals: null,
      total: 0,
      pageSize: 3,
      currentPage: 1,
      counter: 45,
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
        let response = await this.$http.get(
          `/api/sampleData/savingsGoals?from=${from}&to=${to}`
        );
        console.log(response.data.savingsGoals);
        this.savingsGoals = response.data.savingsGoals;
        this.couter = 3000;
        this.total = response.data.total;
      } catch (err) {
        window.alert(err);
        console.log(err);
      }
    }
  },

  async created() {
    this.loadPage(1);
  }
};
</script>

<style>
</style>
