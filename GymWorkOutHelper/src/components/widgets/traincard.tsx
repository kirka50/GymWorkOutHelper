import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {ITrain} from "@/models/Train.model.ts";
import TrainStation from "@/components/cs/TrainStation.tsx";

interface TrainCardProps {
    train: ITrain;
}

function TrainCard({train}:TrainCardProps) {
    return(
        <Card className={'mx-2'}>
            <CardHeader>
                <CardTitle>Последняя тренировка</CardTitle>
                <CardDescription>Тренировка от {train.date}</CardDescription>
                <div className={'flex gap-2 flex-nowrap overflow-hidden col-end-3'}>
                    <div>Cтатус: {train.status}</div>
                    <div>Оплатил: {train.payedBy}</div>
                    <div>Тип: {train.type}</div>
                </div>
            </CardHeader>
            <Separator/>
            <CardContent>
                {train.stationList?.map((station, id) => {
                    return <TrainStation key={id} station={station}/>
                })}
            </CardContent>
            <Separator/>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}

export default TrainCard;