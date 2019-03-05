<template>
  <div class="editarea">
    <div>
      <div class="editfields">
        <div>
          <label>Title:</label>
          <input
            v-if="addingSavingsGoal"
            type="text"
            v-model="editingSavingsGoal.title"
            ref="title"
            placeholder="Title"
          >
          <label v-if="!addingSavingsGoal" class="value">{{editingSavingsGoal.title}}</label>
        </div>
        <div>
          <label>Target Amount:</label>
          <input
            v-model="editingSavingsGoal.targetAmount"
            ref="targetAmount"
            type="number"
            placeholder="Target Amount"
          >
        </div>
        <div>
          <label>Amount Saved:</label>
          <input
            v-model="editingSavingsGoal.amountSaved"
            ref="amountSaved"
            type="number"
            placeholder="Amout Already Saved"
          >
        </div>
      </div>
      <button @click="clear">Cancel</button>
      <button @click="save">Save</button>
    </div>
  </div>
</template>

<script>
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
  mounted() {
    if (this.addingSavingsGoal && this.editingSavingsGoal) {
      this.$refs.title.focus();
    } else {
      this.$refs.amountSaved.focus();
    }
  },
  methods: {
    addSavingsGoal() {
      const savingGoal = this.editingSavingsGoal;
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
  float: left;
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