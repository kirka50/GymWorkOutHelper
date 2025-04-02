import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {Input} from "@/components/ui/input.tsx";

function PayerInputModal({
                                    open,
                                    onClose,
                                    payer,
                                    setPayer,
                                    onSave
                                }: {
    open: boolean;
    onClose: () => void;
    payer: string;
    setPayer: (value: string) => void;
    onSave: () => void;
}) {
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Ввод плательщика</AlertDialogTitle>
                    <AlertDialogDescription>
                        Введите имя плательщика.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Input
                    placeholder="Имя плательщика"
                    value={payer}
                    onChange={(e) => setPayer(e.target.value)}
                />
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={onSave}>Сохранить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default PayerInputModal;