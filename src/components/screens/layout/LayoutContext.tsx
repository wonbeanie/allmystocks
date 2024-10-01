import { createContext, ReactElement, ReactNode } from 'react';

export const LayoutContext = createContext<layoutContextType>({
    modalOpen : (visible : boolean, context ?: ReactElement) => {}
});


interface layoutContextType {
    modalOpen : modalOpenType,
}

export type modalOpenType = (visible : boolean, context ?: ReactElement) => void;