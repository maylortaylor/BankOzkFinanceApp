import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import SavingsGoal from '../../models/savingsGoal.model';

@Component({
    props: ["title"]
})
export default class SavingsGoalUpsertComponent extends Vue {
    @Prop() savingsGoal: SavingsGoal;
    addingGoal = !this.savingsGoal;
    editingGoal: SavingsGoal | null;

    constructor() {
        super();

    }
    mounted() {
        console.log('mounted');

    }
    create() {
        console.log(this.$data);
    }
}
