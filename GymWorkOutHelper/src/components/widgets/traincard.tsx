import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {ITrain} from "@/models/Train.model.ts";
import TrainStation from "@/components/cs/TrainStation.tsx";
import {Button} from "@/components/ui/button.tsx";
import {db} from "@/models/TrainDB.ts";

interface TrainCardProps {
    train: ITrain;
    refreshTrain: (id: string) => void;
}

function TrainCard({train, refreshTrain}: TrainCardProps) {

    const completeTrain = async (id: string) => {
        await db.setTrainFinished(id)
        refreshTrain(id)
    }

    const completeTrainButton = () => {
        if (train.status === "pending") return (
            <Button onClick={() => {train?.id ? completeTrain(train.id) : ''}} className={'bg-green-500'}>
                Заверщить тренировку
            </Button>
        )
    }

    const showAvainableStations = () => {
        if (train.stationList) {
            return (
                <>
                    <Separator/>
                    <CardContent>
                        {train.stationList?.map((station, id) => {
                            return (
                                <TrainStation key={id} station={station}/>
                            )
                        })}
                    </CardContent>
                    <Separator/>
                </>
            )
        }
    }

    return (
        <Card className={'mx-2'}>
            <CardHeader>
                <CardTitle> Тренировка от {new Date(train.date).toLocaleString()}</CardTitle>
                <CardDescription>Тренировка с id: {train.id}</CardDescription>
                <div className={'flex gap-2 flex-nowrap overflow-hidden col-end-3'}>
                    <div>Cтатус: { train.status === 'pending' ? 'Запланировано'
                        : train.status === 'finished' ? 'Завершена' : 'Отменена' }</div>
                    {train?.payedBy ? <div>Оплатил: {train.payedBy}</div> : ''}
                    <div>Тип: {train.type === 'solo' ? 'Соло': 'Сплит'}</div>
                </div>
            </CardHeader>
            <CardContent>
                {completeTrainButton()}
                {showAvainableStations()}
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}

export default TrainCard;