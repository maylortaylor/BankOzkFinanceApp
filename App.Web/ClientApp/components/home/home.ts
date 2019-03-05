import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
    components: {
        ListComponent: require('../savingsGoalList/savingsGoalList.vue.html')
    }
})
export default class HomeComponent extends Vue {
}
