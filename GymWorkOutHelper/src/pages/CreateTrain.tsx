
import { useNavigate } from 'react-router';
function CreateTrain() {
    const navigate = useNavigate();

    return (

        <>
            <div className={'border-b-2 border-gray-200'}>
                <div className={'w-full flex flex-row justify-between p-2'}>
                    <div className={'text-start'}>
                        Иконка
                    </div>
                    <div className={'text-center text-lg font-bold'}>Запланировать тренировку </div>
                    <div onClick={() => { navigate(-1) }} className={'text-end'}>
                        Назад
                    </div>
                </div>
            </div>
            <div>

            </div>
        </>)
}

export default CreateTrain