import {
    createContext,
    useContext,
    useMemo,
    JSX, useCallback
} from 'react';
import {ModalType} from "@/hooks/useTrainCard.ts";


type ModalsContextType = {
    isModalOpen: (type: ModalType) => boolean;
    closeModal: (type: ModalType) => void;
};

const ModalsContext = createContext<ModalsContextType | null>(null);

export const ModalsProvider = ({children, modals, closeModal}:
                                   {
                                       children: JSX.Element[],
                                       modals: Record<ModalType, boolean>,
                                       closeModal: (type: ModalType) => void
                                   }) => {

    const isModalOpen = useCallback((type: ModalType) => modals[type], [modals]);

    const value = useMemo(() => ({
        isModalOpen,
        closeModal
    }), [modals]);

    return (
        <ModalsContext.Provider value={value}>
            {children}
        </ModalsContext.Provider>
    );
};

export const useModals = () => {
    const context = useContext(ModalsContext);
    if (!context) {
        throw new Error('useModals must be used within a ModalsProvider');
    }
    return context;
};