import Dexie, {Table} from "dexie";
import {ITrain} from "@/models/Train.model.ts";
import {testData} from "@/models/testData.ts";


export class TrainDB extends Dexie{
    trainItem!: Table<ITrain, number>
    constructor() {
        super('TrainDB');
        this.version(1).stores({
            trainItem: '++id'
        })
    }

    async listAll() {
        return this.transaction('r', this.trainItem, () => {
            this.trainItem.toArray()
        })
    }

    async setTrainFinished(id: number) {
        return this.transaction('rw', this.trainItem, async () => {
            return this.trainItem.update(id, {status: "finished"});
        })
    }

    async addTrain(train: ITrain) {
        return this.transaction('rw', this.trainItem, async () => {
            return this.trainItem.add(train);
        });
    }

    async setPayer(id: number, payer: string) {
        return this.transaction('rw', this.trainItem, async () => {
            return this.trainItem.update(id, {payedBy: payer});
        })
    }
}

export const db = new TrainDB();
db.on('populate', testData)

export function resetDatabase() {
    return db.transaction('rw', db.trainItem, async () => {
        await Promise.all(db.tables.map(table => table.clear()));
        await testData();
    });
}