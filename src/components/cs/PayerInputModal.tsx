import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {memo, useState} from "react";
import {useModals} from "@/components/cs/ModalsContext.tsx";

const PayerInputModal = memo(({
                                    onSave
                                }: {
    onSave: (payer:string) => void;
}) =>{
    const [payer, setPayer] = useState('')
    const {isModalOpen, closeModal} = useModals();
    return (
        <AlertDialog open={isModalOpen('payerInput')} onOpenChange={() => closeModal("payerInput")}>
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
                    <AlertDialogAction onClick={() => {onSave(payer)}}>Сохранить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
})

export default PayerInputModal;