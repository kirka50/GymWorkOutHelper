import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {ITrain} from "@/models/Train.model.ts";
import TrainStation from "@/components/cs/TrainStation.tsx";
import {Button} from "@/components/ui/button.tsx";
import {db} from "@/models/TrainDB.ts";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from "@/components/ui/alert-dialog.tsx";

interface TrainCardProps {
    train: ITrain;
}

function TrainCard({train}: TrainCardProps) {
    const [trainState, setTrain] = useState<ITrain>(train);
    const [payer, setPayer] = useState("");
    const [modalMode, setModalMode] = useState<"confirmFinish" | "payerInput" | null>(null);

    const refreshTrain = async (id: number) => {
        try {
            const item = await db.trainItem.get(Number(id));
            if (item) {
                setTrain(item);
            }
        } catch (error) {
            console.error("Ошибка при обновлении тренировки:", error);
        }
    };

    const completeTrain = async () => {
        if (!trainState?.id) return;
        await db.setTrainFinished(trainState.id);
        await refreshTrain(trainState.id);
        setModalMode(null);
    };

    const savePayer = async () => {
        if (!trainState?.id || !payer) return;
        await db.trainItem.update(trainState.id, {payedBy: payer});
        await refreshTrain(trainState.id);
        setModalMode(null);
    };

    return (
        <>
            <Card className="mx-2">
                <CardHeader>
                    <CardTitle>Тренировка от {new Date(trainState.date).toLocaleString()}</CardTitle>
                    <CardDescription>Тренировка с id: {trainState.id}</CardDescription>
                    <div className="flex gap-2 flex-nowrap justify-between overflow-hidden col-end-3">
                        <div>
                            <div className={'text-sm text-primary opacity-50'}>
                                Cтатус:
                            </div>
                            {trainState.status === "pending"
                                ? "Запланировано"
                                : trainState.status === "finished"
                                    ? "Завершена"
                                    : "Отменена"}
                        </div>
                        <div>
                            <div className={'text-sm text-primary opacity-50'}>
                                Оплатил:
                            </div>
                            {trainState?.payedBy
                                ||
                                <Button size='sm' className={'text-sm'} onClick={() => {
                                    setModalMode("payerInput")}}>
                                    +
                                </Button>}
                        </div>
                        <div>
                            <div className={'text-sm text-primary opacity-50'}>
                                Тип:
                            </div>
                            {trainState.type === "solo" ? "Соло" : "Сплит"}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {trainState.status === "pending" && (
                        <Button onClick={() => {
                            setModalMode("confirmFinish")
                        }} className="bg-green-500">
                            Завершить тренировку
                        </Button>
                    )}
                    {trainState.stationList && (
                        <>
                            <Separator/>
                            <CardContent>
                                {trainState.stationList.map((station, id) => (
                                    <TrainStation key={id} station={station}/>
                                ))}
                            </CardContent>
                            <Separator/>
                        </>
                    )}
                </CardContent>
                <CardFooter/>
            </Card>


            <AlertDialog open={!!modalMode} onOpenChange={() => setModalMode(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        {modalMode === "confirmFinish" ? (
                            <>
                                <AlertDialogTitle>Подтверждение</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Вы уверены, что хотите завершить эту тренировку?
                                </AlertDialogDescription>
                            </>
                        ) : (
                            <>
                                <AlertDialogTitle>Введите плательщика</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Введите имя плательщика.
                                </AlertDialogDescription>
                            </>
                        )}
                    </AlertDialogHeader>

                    {modalMode === "payerInput" && (
                        <Input
                            placeholder="Имя плательщика"
                            value={payer}
                            onChange={(e) => setPayer(e.target.value)}
                        />
                    )}

                    <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        {modalMode === "confirmFinish" ? (
                            <AlertDialogAction onClick={completeTrain}>Подтвердить</AlertDialogAction>
                        ) : (
                            <AlertDialogAction onClick={savePayer}>Сохранить</AlertDialogAction>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default TrainCard;