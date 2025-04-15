import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {ITrain} from "@/models/Train.model.ts";
import TrainStation from "@/components/cs/TrainStation.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useTrainCard} from "@/hooks/useTrainCard.ts";
import TrainHeaderMeta from "@/components/cs/TrainHeaderMeta.tsx";
import ConfirmFinishModal from "@/components/cs/ConfirmFinishModal.tsx";
import PayerInputModal from "@/components/cs/PayerInputModal.tsx";
import {ModalsProvider} from "@/components/cs/ModalsContext.tsx";
import AddTrainStationModal from "@/components/cs/AddTrainStationModal.tsx";

interface TrainCardProps {
    initTrain: ITrain;
}


function TrainCard({initTrain}: TrainCardProps) {
    const {
        train,
        handlers,
        modals,
        openModal,
        closeModal
    } = useTrainCard(initTrain);


    return (
        <>
            <Card className="mx-2">
                <CardHeader>
                    <CardTitle>Тренировка от {new Date(train.date).toLocaleString()}</CardTitle>
                    <CardDescription>Тренировка с id: {train.id}</CardDescription>
                    <TrainHeaderMeta train={train} onPayerClick={() => openModal("payerInput")}/>
                </CardHeader>
                <CardContent>
                    {train.status === "pending" && (
                        <Button onClick={() => openModal("confirmFinish")} className="bg-green-500">
                            Завершить тренировку
                        </Button>
                    )}
                    {train.stationList && (
                        <>
                            <Separator/>
                            <CardContent>
                                {train.stationList.map((station, id) => (
                                    <TrainStation key={id} station={station}/>
                                ))}
                            </CardContent>
                            <Separator/>
                        </>
                    )}
                </CardContent>

                <CardFooter>
                    {train.status === "finished" ?
                        <Button
                            onClick={() => openModal("addTrainStation")}
                        >
                            Добавить тренажёр
                        </Button> : ''}
                </CardFooter>
            </Card>
            {/*TODO Надо сделать нормальную условную отрисовку*/}
            <ModalsProvider modals={modals} closeModal={closeModal}>
                <ConfirmFinishModal onConfirm={handlers.completeTrain}/>
                <PayerInputModal onSave={handlers.savePayer}/>
                <AddTrainStationModal onSave={handlers.handleTrainStationAdd}/>
            </ModalsProvider>
        </>
    );
}

export default TrainCard;
