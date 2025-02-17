import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {ITrain} from "@/models/Train.model.ts";
import TrainStation from "@/components/cs/TrainStation.tsx";

interface TrainCardProps {
    train: ITrain;
}




function TrainCard({train}: TrainCardProps) {

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
                <CardTitle> Тренировка от {train.date}</CardTitle>
                <CardDescription>Тренировка с id: {train.id}</CardDescription>
                <div className={'flex gap-2 flex-nowrap overflow-hidden col-end-3'}>
                    <div>Cтатус: {train.status}</div>
                    <div>Оплатил: {train.payedBy}</div>
                    <div>Тип: {train.type}</div>
                </div>
            </CardHeader>
            <CardContent>
                {showAvainableStations()}
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    )
}

export default TrainCard;