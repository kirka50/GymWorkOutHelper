interface ITrain {
    id?: number;
    date: string;
    type: "solo" | "split";
    payedBy?: string;
    status: "pending" | "finished" | "skipped";
    stationList?: ITrainStation[];
    updatedAt: string;
}

interface ITrainStation {
    personName: string;
    stationName: string;
    weight: string;
    repeats: number;
}


export type {ITrain, ITrainStation};