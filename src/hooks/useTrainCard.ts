import {ITrain, ITrainStation} from "@/models/Train.model.ts";
import {useCallback, useState} from "react";
import {db} from "@/models/TrainDB.ts";

export type ModalType =
    | 'confirmFinish'
    | 'payerInput'
    | 'addTrainStation';

export const useTrainCard = (initTrain:ITrain) => {
    const [train, setTrain] = useState<ITrain>(initTrain);

    const [modals, setModals] = useState<Record<ModalType, boolean>>({
        confirmFinish: false,
        payerInput: false,
        addTrainStation: false,
    });

    const openModal = useCallback((type: ModalType) => {
        setModals(prev => ({ ...prev, [type]: true }));
    }, []);

    const closeModal = useCallback((type: ModalType) => {
        setModals(prev => ({ ...prev, [type]: false }));
    }, []);


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

    const handleSavePayer = async (payer:string) => {
        if (!train?.id || !payer) return;
        await db.trainItem.update(train.id, { payedBy: payer });
        await refreshTrain(train.id);
    };

    const handleTrainStationAdd = async (trainStation: ITrainStation) => {
        if (!train?.id) return;
        await db.addTrainStation(train.id, trainStation)
        await refreshTrain(train.id)
    };


    return {
        train,
        modals: modals,
        handlers: {
            handleTrainStationAdd: handleTrainStationAdd,
            completeTrain: handleCompleteTrain,
            savePayer: handleSavePayer,
        },
        openModal: openModal,
        closeModal: closeModal,
    };
}