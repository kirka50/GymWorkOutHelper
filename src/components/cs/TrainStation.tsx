import {ITrainStation} from "@/models/Train.model.ts";

interface ITrainStationProps {
    station: ITrainStation;
}

function TrainStation({station}:ITrainStationProps) {


    return (
        <div className={'flex flex-col mt-1'}>
            <div className={'font-bold'}>
                {station.personName}
            </div>
            <div className={''}>
                Тренажёр: {station.stationName}
            </div>
            <div>
                Вес: {station.weight}
            </div>
            <div>
                Повторения: {station.repeats}
            </div>
        </div>
    )
}


export default TrainStation