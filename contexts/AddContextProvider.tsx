import { useState, ReactNode, createContext } from 'react';
import { WalletItem } from '@/utils/types';

interface AddContextProps {
    currentPath: String | null;
    isShown: Boolean;
    show: () => void;
    hide: () => void;
    changePath: (path: String) => void;
    removePath: () => void;
    currentWallet: WalletItem | null;
    setWallet: (wallet: WalletItem) => void,
}

export const AddContext = createContext<AddContextProps>({
    currentPath: null,
    isShown: false,
    show: () => {},
    hide: () => {},
    changePath: (path: String) => {},
    removePath: () => {},
    currentWallet: null,
    setWallet: (wallet: WalletItem) => {},
});


interface AddContextProviderProps {
    children: ReactNode;
}

export default function AddContextProvider({ children }: AddContextProviderProps) {
    const [currentWallet, setCurrentWallet] = useState<WalletItem | null>(null);
    const [currentPath, setCurrentPath] = useState<String | null>(null);
    const [isShown, setShown] = useState<Boolean>(false);

    function show() {
        setShown(true);
    }

    function hide() {
        setShown(false);
    }

    function changePath(path: String) {
        setCurrentPath(path);
    }

    function removePath() {
        setShown(false);
        setCurrentPath(null);
    }

    function setWallet(wallet: WalletItem) {
        setCurrentWallet(wallet);
    }

    const value = {
        currentPath: currentPath,
        isShown: isShown,
        show: show,
        hide: hide,
        changePath: changePath,
        removePath: removePath,
        currentWallet: currentWallet,
        setWallet: setWallet,
    }

    return (
        <AddContext.Provider value={value}>
            { children }
        </AddContext.Provider>
    );
}
