import BaseModel from "./baseModel";
export class SavingsGoal extends BaseModel {
    title: string;
    description: string;
    completed: boolean;
    targetAmount?: number;
    amountSaved?: number;
    constructor(title: string, description: string, targetAmount: number, amountSaved: number) {
        super();

        this.title = title;
        this.description = description;
        this.targetAmount = targetAmount;
        this.amountSaved = amountSaved;

        this.completed = false;
    }
}

export default SavingsGoal;