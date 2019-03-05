<template>
  <div class="editarea">
    <div>
      <div class="editfields">
        <b-form @submit="save" @reset="clear" v-if="addingSavingsGoal || editingSavingsGoal">
          <b-form-group id="title" label="Savings Goal Title:" label-for="title">
            <b-form-input
              id="title"
              autofocus
              type="text"
              v-model="editingSavingsGoal.title"
              required
              placeholder="Savings Goal Title"
            />
          </b-form-group>
          <b-form-group id="targetAmount" label="Target Amount:" label-for="targetAmount">
            <b-form-input
              id="targetAmount"
              type="number"
              v-model="editingSavingsGoal.targetAmount"
              required
              placeholder="Target Amount"
            />
          </b-form-group>
          <b-form-group id="amountSaved" label="Amount Already Saved:" label-for="amountSaved">
            <b-form-input
              id="amountSaved"
              type="number"
              v-model="editingSavingsGoal.amountSaved"
              placeholder="Amount Already Saved"
            />
          </b-form-group>

          <b-button type="reset" variant="outline-danger">Cancel</b-button>
          <b-button type="submit" variant="success">Save</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
const uuidv4 = require("uuid/v4");
export default {
  props: { savingsGoal: { type: Object } },
  data() {
    return {
      addingSavingsGoal: !this.savingsGoal,
      editingSavingsGoal: this.cloneIt()
    };
  },
  watch: {
    savingsGoal() {
      this.editingSavingsGoal = this.cloneIt();
    }
  },
  mounted() {},
  methods: {
    addSavingsGoal() {
      this.editingSavingsGoal.id = uuidv4();
      this.emitRefresh("add");
    },
    clear() {
      this.$emit("unselect");
      this.editingSavingsGoal = null;
    },
    cloneIt() {
      return Object.assign({}, this.savingsGoal);
    },
    emitRefresh(mode) {
      this.$emit("savingsGoalChanged", {
        mode: mode,
        savingsGoal: this.editingSavingsGoal
      });
      this.clear();
    },
    save() {
      if (this.addingSavingsGoal) {
        this.addSavingsGoal();
      } else {
        this.updateSavingsGoal();
      }
    },
    updateSavingsGoal() {
      const savingsGoal = this.editingSavingsGoal;
      this.emitRefresh("update");
    }
  }
};
</script>

<style lang="css" scoped>
.editarea {
  padding-top: 10px;
  float: left;
  width: 90%;
}
.form-group {
  color: gainsboro !important;
}
input {
  margin: 4px;
  height: 20px;
  color: rgb(0, 120, 215);
}
button {
  margin: 8px;
}
.editfields {
  margin-left: 12px;
}
</style>
