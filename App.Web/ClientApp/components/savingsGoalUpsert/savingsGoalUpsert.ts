import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import SavingsGoal from '../../models/savingsGoal.model';

@Component({
    props: ["title"]
})
export default class SavingsGoalUpsertComponent extends Vue {
    title: string;
    amountSaved: number;
    targetAmount: number;
    mounted() {
        console.log('mounted');
        console.log(this.$route.params.title);
    }
    create() {
        console.log(this.$data);
    }
}
