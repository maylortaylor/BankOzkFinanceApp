import axios from 'axios';

const api = 'api';

export default {
    getSampleData(from, to) {
        return axios.get(`${api}/sampleData/savingsGoals?from=${from}&to=${to}`);
    },
    deleteSavingsGoal(sGoal) {
        return axios.delete(`${api}/sampleData/${sGoal.title}`);
    },
    // getHeroes() {
    //     return axios.get(`${api}/heroes`);
    // },
    // addHero(hero) {
    //     return axios.post(`${api}/hero/`, { hero });
    // },
    // updateHero(hero) {
    //     return axios.put(`${api}/hero/${hero.id}`, { hero });
    // }
};