export class BaseModel {


    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    createdAt: Date;
    updatedAt: Date;
    deleted_At: Date;
}

export default BaseModel;