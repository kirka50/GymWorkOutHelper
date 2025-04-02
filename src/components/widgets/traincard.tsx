import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {ITrain} from "@/models/Train.model.ts";
import TrainStation from "@/components/cs/TrainStation.tsx";
import {Button} from "@/components/ui/button.tsx";
import ConfirmFinishModal from "@/components/cs/ConfirmFinishModal.tsx";
import PayerInputModal from "@/components/cs/PayerInputModal.tsx";
import {useTrainCard} from "@/hooks/useTrainCard.ts";
import TrainHeaderMeta from "@/components/cs/TrainHeaderMeta.tsx";

interface TrainCardProps {
    initTrain: ITrain;
}


function TrainCard({initTrain}: TrainCardProps) {
    const {
        train,
        modals,
        setPayer,
        payer,
        handlers,
        closeModal,
    } = useTrainCard(initTrain);

    return (
        <>
            <Card className="mx-2">
                <CardHeader>
                    <CardTitle>Тренировка от {new Date(train.date).toLocaleString()}</CardTitle>
                    <CardDescription>Тренировка с id: {train.id}</CardDescription>
                    <TrainHeaderMeta train={train} onPayerClick={handlers.openPayerModal}/>
                </CardHeader>
                <CardContent>
                    {train.status === "pending" && (
                        <Button onClick={handlers.openConfirmModal} className="bg-green-500">
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
                    {train.status === "finished" ? <Button>
                        Добавить тренажёр
                    </Button> : ''}
                </CardFooter>
            </Card>
            <ConfirmFinishModal
                open={modals.confirmFinish}
                onClose={closeModal("confirmFinish")}
                onConfirm={handlers.completeTrain}
            />

            <PayerInputModal
                open={modals.payerInput}
                onClose={closeModal('payerInput')}
                payer={payer}
                setPayer={setPayer}
                onSave={handlers.savePayer}
            />
        </>
    );
}

export default TrainCard;
