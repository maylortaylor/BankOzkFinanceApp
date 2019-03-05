import axios from 'axios';

const api = 'api';

export default {
    getSampleData(from, to) {
        return axios.get(`${api}/sampleData/savingsGoals?from=${from}&to=${to}`);
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
        return Promise.resolve().then(function () {
            localStorage.setItem(sGoal.title, sGoal);
        });
    },
    updateSavingsGoal(sGoal) {
        return Promise.resolve().then(function () {
            localStorage.setItem(sGoal.title, sGoal);
        });
    }
};