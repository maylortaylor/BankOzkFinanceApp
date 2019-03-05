import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import SavingsGoal from '../../models/savingsGoal.model';

@Component({

})
export default class SavingsGoalListComponent extends Vue {

    savingsGoals: SavingsGoal[] = [];

    mounted() {
        console.log('mounted');

        fetch('api/SampleData/SavingsGoals')
            .then(response => response.json() as Promise<SavingsGoal[]>)
            .then(data => {
                console.log(data);

                this.savingsGoals = data;
            });
    }
}
