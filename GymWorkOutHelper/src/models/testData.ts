import { db } from "./TrainDB.ts";

export async function testData() {
    console.log('testData');
    await db.trainItem.bulkAdd([
        {
            date: '10.10.10',
            payedBy: 'RK',
            status: "pending",
            type: "solo",
        },
        {
            date: '11.11.11',
            payedBy: 'NG',
            status: "finished",
            type: "split",
        },
        {
            date: '12.12.12',
            payedBy: 'RK',
            status: "skipped",
            type: "solo",
        },
        {
            date: '13.13.13',
            payedBy: 'RK',
            status: "pending",
            type: "split",
        },
    ]);
}