import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {ITrain, ITrainStation} from "@/models/Train.model.ts";
import TrainStation from "@/components/cs/TrainStation.tsx";
import {Button} from "@/components/ui/button.tsx";
import {db} from "@/models/TrainDB.ts";
import {useState} from "react";
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
import {Input} from "@/components/ui/input.tsx"

interface TrainCardProps {
    train: ITrain;
}

interface TrainModalProps {
    modalMode: "confirmFinish" | "payerInput" | "stationInput" | null;
    payer: string;
    setPayer: (value: string) => void;
    completeTrain: () => Promise<void>;
    savePayer: () => Promise<void>;
    onClose: () => void;
}

function TrainModal({
                        modalMode,
                        payer,
                        setPayer,
                        completeTrain,
                        savePayer,
                        onClose
                    }: TrainModalProps) {
    const [trainStation, setTrainStation] = useState<ITrainStation>();


    const getHeaderContent = () => {
        const getHeaderTitle = (title: string, desc: string) => {
            return <>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>
                    {desc}
                </AlertDialogDescription>
            </>
        }
        switch (modalMode) {
            case "confirmFinish":
                return (
                    getHeaderTitle("Подтверждение", "Вы уверены, что хотите завершить эту тренировку?")
                );
            case "payerInput":
                return (
                    getHeaderTitle("Ввод плательщика", "Введите имя плательщика.")
                );

            case "stationInput":
                return (
                    getHeaderTitle("Добавление рабочей станции", "Заполните форму станции")
                )
            default:
                return null;
        }
    }

    const getBodyContent = () => {

        switch (modalMode) {
            case "payerInput":
                return (
                    <>
                        <Input
                            placeholder="Имя плательщика"
                            value={payer}
                            onChange={(e) => setPayer(e.target.value)}
                        />
                    </>
                )
            case "stationInput":
                return (
                    <>


                    </>
                )
        }
    }

    return (
        <AlertDialog open={!!modalMode} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    {getHeaderContent()}
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
    );
}

function TrainCard({train}: TrainCardProps) {
    const [trainState, setTrain] = useState<ITrain>(train);
    const [payer, setPayer] = useState("");
    const [modalMode, setModalMode] = useState<"confirmFinish" | "payerInput" | "stationInput" | null>(null);

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
                                    setModalMode("payerInput")
                                }}>
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

                <CardFooter>
                    {trainState.status === "finished" ? <Button>
                        Добавить тренажёр
                    </Button> : ''}
                </CardFooter>
            </Card>

            <TrainModal
                modalMode={modalMode}
                payer={payer}
                setPayer={setPayer}
                completeTrain={completeTrain}
                savePayer={savePayer}
                onClose={() => setModalMode(null)}
            />
        </>
    );
}

export default TrainCard;
