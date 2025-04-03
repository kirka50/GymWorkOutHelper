import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {ITrainStation} from "@/models/Train.model.ts";

function AddTrainStationModal({
                                 open,
                                 onClose,
                                onSave
                             }: {
    open: boolean;
    onClose: () => void;
    onSave:(trainStatin: ITrainStation) => void
}) {
    const [trainStation, setTrainStation] = useState<ITrainStation>(
        {
            personName: '',
            repeats: 0,
            stationName: '',
            weight: '',
        }
    )

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Добавление тренажёра</AlertDialogTitle>
                    <AlertDialogDescription>
                        Введите информацию о тренажёре
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Input
                    type="text"
                    placeholder="Название тренажёра"
                    value={trainStation?.stationName}
                    onChange={(e) =>
                    {setTrainStation(prev => ({...prev, stationName: e.target.value }))}}
                />
                <Input
                    type="text"
                    placeholder="Кто делал"
                    value={trainStation?.personName}
                    onChange={(e) =>
                    {setTrainStation(prev => ({...prev, personName: e.target.value }))}}
                />
                <Input
                    type="text"
                    placeholder="Вес"
                    value={trainStation?.weight}
                    onChange={(e) =>
                    {setTrainStation(prev => ({...prev, weight: e.target.value }))}}
                />
                <Input
                    type="number"
                    placeholder="Повторения"
                    value={trainStation?.repeats}
                    onChange={(e) =>
                    {setTrainStation(prev => ({...prev, repeats: parseInt(e.target.value) }))}}
                />
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {onSave(trainStation)}}>Сохранить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AddTrainStationModal;