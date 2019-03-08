import axios from 'axios';
import LocalStorage from './localStorage.service';
const LOCAL_STORAGE_KEY = 'goals:savings';

export default {
  getSampleData(from, to) {
    return axios.get(`api/sampleData/savingsGoals?from=${from}&to=${to}`);
  },
  getSavingsGoals(key) {
    return LocalStorage.getItem(key == null ? LOCAL_STORAGE_KEY : key);
  },
  deleteSavingsGoal(sGoal) {
    return LocalStorage.removeItem(sGoal);
  },
  addSavingsGoal(sGoal) {
    debugger
    // var o = JSON.stringify(sGoal);
    var o = sGoal;
    var existingGoals = [];
    return this.getSavingsGoals(LOCAL_STORAGE_KEY).then((r) => {
      this.existingGoals = r;
      console.log('existing goals', this.existingGoals);
      if (!this.existingGoals) {
        this.existingGoals = [];
      }
      this.existingGoals.push({ [o.id]: this.mapObject(o) });
      LocalStorage.setItem(LOCAL_STORAGE_KEY, this.existingGoals);
      return this.existingGoals;
    });
  },
  updateSavingsGoal(sGoal) {
    debugger;
    LocalStorage.getItem(LOCAL_STORAGE_KEY).then((r) => {
      debugger
      LocalStorage.setItem(LOCAL_STORAGE_KEY, sGoal);
    })
  },
  mapObject(obj) {
    // Because VueBootstrap only returns strings, we need to parseInts
    var returnObj = {};
    returnObj.id = obj.id;
    returnObj.title = obj.title;
    returnObj.description = obj.description;
    returnObj.completed = obj.completed;
    returnObj.createdAt = obj.createdAt == null ? new Date() : obj.createdAt;
    returnObj.targetAmount = parseInt(obj.targetAmount);
    returnObj.amountSaved = parseInt(obj.amountSaved);
    return returnObj;
  }
};
