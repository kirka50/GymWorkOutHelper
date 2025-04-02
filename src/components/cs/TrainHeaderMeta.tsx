import {ITrain} from "@/models/Train.model.ts";
import {Button} from "@/components/ui/button.tsx";

interface TrainHeaderMetaProps {
    train: ITrain;
    onPayerClick: () => void;
}

function TrainHeaderMeta({train, onPayerClick}: TrainHeaderMetaProps) {
    return (
        <div className="flex gap-2 flex-nowrap justify-between overflow-hidden col-end-3">
            <div>
                <div className="text-sm text-primary opacity-50">Статус:</div>
                {train.status === "pending" && "Запланировано"}
                {train.status === "finished" && "Завершена"}
                {train.status === "skipped" && "Пропущена"}
            </div>

            <div>
                <div className="text-sm text-primary opacity-50">Оплатил:</div>
                {train?.payedBy
                    ||
                    <Button size='sm' className={'text-sm'} onClick={onPayerClick}>
                        +
                    </Button>}
            </div>

            <div>
                <div className="text-sm text-primary opacity-50">Тип:</div>
                {train.type === "solo" ? "Соло" : "Сплит"}
            </div>
        </div>
    )
}

export default TrainHeaderMeta