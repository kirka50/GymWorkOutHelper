import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {useModals} from "@/components/cs/ModalsContext.tsx";
import {memo} from "react";

const ConfirmFinishModal = memo(({

                                onConfirm
                            }: {
    onConfirm: () => void;
}) => {
    const {isModalOpen, closeModal} = useModals();
    return (
        <AlertDialog open={isModalOpen('confirmFinish')} onOpenChange={() => {closeModal("confirmFinish")}}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Подтверждение</AlertDialogTitle>
                    <AlertDialogDescription>
                        Вы уверены, что хотите завершить эту тренировку?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Подтвердить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
})

export default ConfirmFinishModal;