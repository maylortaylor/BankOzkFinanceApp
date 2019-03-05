import axios from 'axios';
import LocalStorage from './localStorage.service';

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
    var o = JSON.stringify(sGoal);
    var existingGoals = [];
    this.getSavingsGoals().then((r) => {
      console.log('1st then', r);

      this.existingGoals = r;
      console.log('existing', this.existingGoals);
      return this.existingGoals;
    }).then((r) => {
      console.log('2nd then', r);
      this.existingGoals.push(o);
      LocalStorage.setItem('goals', this.existingGoals);
    });
  },
  updateSavingsGoal(sGoal) {
    var t = sGoal.title;
    var o = JSON.stringify(sGoal);
    return Promise.resolve().then(function () {
      LocalStorage.setItem('goals', o);
    });
  }
};
