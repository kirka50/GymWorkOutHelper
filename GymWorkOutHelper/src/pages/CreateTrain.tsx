import {useNavigate} from 'react-router';
import DateTimePicker from "@/components/cs/DateTimePicker.tsx";
import {useState} from "react";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {db} from "@/models/TrainDB.ts";

type TrainType = 'split' | 'solo'

function CreateTrain() {
    const navigate = useNavigate();
    const [date, setDate] = useState<Date>();
    const [trainType, setTrainType] = useState<TrainType>();
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const clearInputs = () => {
        setDate(undefined);
        setTrainType(undefined);
    }

    const buttonHandler = async () => {
        if (date && trainType) {
            await db.addTrain(
                {
                    date: date?.toString(),
                    type: trainType,
                    status: 'pending',
                }
            )
            setIsOpen(true);
            setTimeout(() => {
                setIsOpen(false);
            }, 1000);
            clearInputs()
        }
    }
    return (

        <>
            <div className={'border-b-2 border-gray-200'}>
                <div className={'w-full flex flex-row justify-between p-2'}>
                    <div className={'text-start'}>
                        Иконка
                    </div>
                    <div className={'text-center text-lg font-bold'}>Запланировать тренировку</div>
                    <div onClick={() => {
                        navigate(-1)
                    }} className={'text-end'}>
                        Назад
                    </div>
                </div>
            </div>
            <div>
                <Card className={'mx-2 mt-2'}>
                    <CardContent className={'mt-2'}>
                        <DateTimePicker selected={date} setSelected={setDate}/>
                        <div>
                            Тип тренировки:
                            <Select onValueChange={(value: string) => {
                                if (value === 'split' || value === 'solo') {
                                    setTrainType(value as TrainType);
                                }
                            }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Тип тренировки"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='split'>Сплит</SelectItem>
                                    <SelectItem value='solo'>Соло</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Popover open={isOpen}>
                            <PopoverTrigger>
                                <Button onClick={buttonHandler} disabled={!(trainType && date)} className={'bg-green-500'}>
                                    Запланировать
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                Запланировано
                            </PopoverContent>
                        </Popover>
                    </CardFooter>
                </Card>
            </div>
        </>);
}

export default CreateTrain