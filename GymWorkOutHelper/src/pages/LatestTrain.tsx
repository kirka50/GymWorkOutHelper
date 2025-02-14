import {NavLink} from "react-router";
import Traincard from "@/components/widgets/traincard.tsx";
import {ITrain} from "@/models/Train.model.ts";

const testTrain:ITrain = {
    id: "testId",
    type: "split",
    payedBy: "РК",
    status: "finished",
    date: "10.10.10",
    stationList: [
        {
            stationName: 'Гантели',
            repeats: 10,
            weight: "20kg"
        }
    ]
}


function LatestTrain(
) {

    return(
        <div className={'p-2'}>
            <div className={'w-full flex flex-row items-center justify-between'}>
                <div>
                    Иконка
                </div>
                <div>
                    <NavLink to={'/CreateTrain'}>
                        Запланировать тренировку
                    </NavLink>
                </div>
            </div>
            <div className={'mt-5'}>
                <Traincard train={testTrain} />
            </div>
        </div>
    )
}

export default LatestTrain