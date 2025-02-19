import {NavLink} from "react-router";
import Traincard from "@/components/widgets/traincard.tsx";
import {ITrain} from "@/models/Train.model.ts";
import {useEffect, useState} from "react";
import {db} from "@/models/TrainDB.ts";


function LatestTrain(
) {


    const [latestTrain, setLatestTrain] = useState<ITrain>();

    const getLastItem = async () => {
        try {
            const item = await db.trainItem.toCollection().last();
            setLatestTrain(item);
        } catch (error) {
            console.error('Ошибка при получении первого элемента:', error);
        }
    };

    useEffect(() => {
        getLastItem();
    }, []);


    return(
        <div>
            <div className={'border-b-2 border-gray-200'}>
                <div className={'w-full flex flex-row justify-between p-2'}>
                    <div className={'text-start'}>
                        Иконка
                    </div>
                    <div className={'text-center text-lg font-bold'}>Последняя тренировка</div>
                    <div className={'text-end'}>
                        <NavLink to={'/CreateTrain'}>
                            Запланировать тренировку
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className={'mt-5 p-2'}>
                {latestTrain ? (
                    <Traincard train={latestTrain}/>
                ) : (<p>Не удалось получить последнюю тренировку</p>)}
            </div>
        </div>
    )
}

export default LatestTrain