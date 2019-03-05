import axios from 'axios';

con

export default {
    getSampleData(from, to) {
        return axios.get(`api/sampleData/savingsGoals?from=${from}&to=${to}`);
    },
    getSavingsGoals() {
        return Promise.resolve().then(function () {
            return localStorage.getItem();
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
            localStorage.setItem(t, o);
        });
    },
    updateSavingsGoal(sGoal) {
        var t = sGoal.title;
        var o = JSON.stringify(sGoal);
        return Promise.resolve().then(function () {
            localStorage.setItem(t, o);
        });
    }
};