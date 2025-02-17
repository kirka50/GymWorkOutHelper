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
}

export const db = new TrainDB();
db.on('populate', testData)

export function resetDatabase() {
    return db.transaction('rw', db.trainItem, async () => {
        await Promise.all(db.tables.map(table => table.clear()));
        await testData();
    });
}