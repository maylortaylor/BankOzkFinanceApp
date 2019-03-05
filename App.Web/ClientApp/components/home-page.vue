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
      <table class="table">
        <thead class="bg-dark text-white">
          <tr>
            <th>Title</th>
            <th>Target Amount</th>
            <th>Amount Saved</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="index % 2 == 0 ? 'bg-white' : 'bg-light'"
            v-for="(savingsGoal, index) in savingsGoals"
            :key="index"
          >
            <td>{{ savingsGoal.title }}</td>
            <td>{{ savingsGoal.targetAmount }}</td>
            <td>{{ savingsGoal.amountSaved }}</td>
            <td>{{ savingsGoal.createdAt }}</td>
          </tr>
        </tbody>
      </table>
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
      pageSize: 5,
      currentPage: 1
    };
  },
  methods: {
    async loadPage(page) {
      // ES2017 async/await syntax via babel-plugin-transform-async-to-generator
      // TypeScript can also transpile async/await down to ES5
      this.currentPage = page;

      try {
        let response = await this.$http.get(`/api/sampleData/savingsGoals`);
        console.log(response.data.savingsGoals);
        this.savingsGoals = response.data.savingsGoals;
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
