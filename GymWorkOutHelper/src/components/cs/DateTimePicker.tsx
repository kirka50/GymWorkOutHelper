import {setHours, setMinutes} from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import {ChangeEventHandler, useState} from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


interface DateTimePickerProps {
    selected: Date | undefined,
    setSelected: (value: Date | undefined) => void,
}

function DateTimePicker({selected,setSelected }: DateTimePickerProps) {
    const [timeValue, setTimeValue] = useState<string>("00:00");
    const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const time = e.target.value;
        if (!selected) {
            setTimeValue(time);
            return;
        }
        const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
        const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
        setSelected(newSelectedDate);
        setTimeValue(time);
    };

    const handleDaySelect = (date: Date | undefined) => {
        if (!timeValue || !date) {
            setSelected(date);
            return;
        }
        const [hours, minutes] = timeValue
            .split(":")
            .map((str) => parseInt(str, 10));
        const newDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hours,
            minutes
        );
        setSelected(newDate);
    };

    return(

        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !selected && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selected ? selected.toLocaleString() : <span>Выбери дату и время тренировки</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <input className={'bg-background'}
                       value={timeValue}
                       onChange={handleTimeChange}
                       type='time' />
                <Calendar
                    mode="single"
                    selected={selected}
                    onSelect={handleDaySelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>

    )
}

export default DateTimePicker;