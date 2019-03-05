import axios from 'axios';


export default {
    getSampleData(from, to) {
        return axios.get(`api/sampleData/savingsGoals?from=${from}&to=${to}`);
    },
    getSavingsGoals() {
        return Promise.resolve().then(function () {
            var parsed = JSON.parse(localStorage.getItem());
            return parsed;
        })
    },
    deleteSavingsGoal(sGoal) {
        return Promise.resolve().then(function () {
            localStorage.removeItem(sGoal);
        });
    },
    addSavingsGoal(sGoal) {
        var t = sGoal.title;
        var o = JSON.stringify(sGoal);
        return Promise.resolve().then(function () {
            localStorage.setItem('goals', o);
        });
    },
    updateSavingsGoal(sGoal) {
        var t = sGoal.title;
        var o = JSON.stringify(sGoal);
        return Promise.resolve().then(function () {
            localStorage.setItem('goals', o);
        });
    }
};