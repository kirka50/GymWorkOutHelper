interface ITrain {
    id: string;
    date: string;
    type: "solo" | "split";
    payedBy?: string;
    status: "pending" | "finished" | "skipped";
    stationList?: ITrainStation[];
}

interface ITrainStation {
    stationName: string;
    weight: string;
    repeats: number;
}


export type {ITrain, ITrainStation};