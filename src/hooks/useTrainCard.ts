import {ITrain, ITrainStation} from "@/models/Train.model.ts";
import {useState} from "react";
import {db} from "@/models/TrainDB.ts";


export const useTrainCard = (initTrain:ITrain) => {
    const [train, setTrain] = useState<ITrain>(initTrain);
    const [payer, setPayer] = useState('');
    const [modals, setModals] = useState({
        confirmFinish: false,
        payerInput: false,
        addTrainStation: false,
    });


    const refreshTrain = async (id: number) => {
        try {
            const item = await db.trainItem.get(id);
            if (item) setTrain(item);
        } catch (error) {
            console.error("Ошибка при обновлении тренировки:", error);
        }
    };

    const handleCompleteTrain = async () => {
        if (!train?.id) return;
        await db.setTrainFinished(train.id);
        await refreshTrain(train.id);
    };

    const handleSavePayer = async () => {
        if (!train?.id || !payer) return;
        await db.trainItem.update(train.id, { payedBy: payer });
        await refreshTrain(train.id);
    };

    const handleTrainStationAdd = async (trainStation: ITrainStation) => {
        if (!train?.id) return;
        await db.addTrainStation(train.id, trainStation)
        await refreshTrain(train.id)
    }

    const openModal = (modal: keyof typeof modals) => () => {
        setModals(prev => ({ ...prev, [modal]: true }));
    };

    const closeModal = (modal: keyof typeof modals) => () => {
        setModals(prev => ({ ...prev, [modal]: false }));
    };



    return {
        train,
        modals,
        payer,
        setPayer,
        handlers: {
            handleTrainStationAdd: handleTrainStationAdd,
            completeTrain: handleCompleteTrain,
            savePayer: handleSavePayer,
            openConfirmModal: openModal("confirmFinish"),
            openPayerModal: openModal("payerInput"),
            openTrainStationModal: openModal("addTrainStation"),
        },
        closeModal,
    };
}