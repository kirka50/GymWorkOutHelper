import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";

function ConfirmFinishModal({
                                       open,
                                       onClose,
                                       onConfirm
                                   }: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}){
   return (
        <AlertDialog open={open} onOpenChange={onClose}>
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
}

export default ConfirmFinishModal;