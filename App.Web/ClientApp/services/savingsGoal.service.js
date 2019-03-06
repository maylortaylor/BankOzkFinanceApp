import axios from 'axios';
import LocalStorage from './localStorage.service';
const LOCAL_STORAGE_KEY = 'goals:savings';

export default {
  getSampleData(from, to) {
    return axios.get(`api/sampleData/savingsGoals?from=${from}&to=${to}`);
  },
  getSavingsGoals(key) {
    return LocalStorage.getItem(key == null ? null : key);
  },
  deleteSavingsGoal(sGoal) {
    return LocalStorage.removeItem(sGoal);
  },
  addSavingsGoal(sGoal) {
    debugger
    var t = sGoal.id;
    // var o = JSON.stringify(sGoal);
    var o = sGoal;
    var existingGoals = [];
    return this.getSavingsGoals(LOCAL_STORAGE_KEY).then((r) => {
      this.existingGoals = r;
      console.log('existing goals', this.existingGoals);
      return this.existingGoals;
    }).then((r) => {
      console.log('2nd then', r);
      if (!this.existingGoals) {
        this.existingGoals = [];
      }
      this.existingGoals.push(o);
      LocalStorage.setItem(LOCAL_STORAGE_KEY, this.existingGoals);
      return this.existingGoals;
    });
  },
  updateSavingsGoal(sGoal) {
    var t = sGoal.title;
    var o = JSON.stringify(sGoal);
    return Promise.resolve().then(function () {
      LocalStorage.setItem(LOCAL_STORAGE_KEY, o);
    });
  }
};
