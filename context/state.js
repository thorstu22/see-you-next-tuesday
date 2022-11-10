import { createContext, useContext, useEffect } from 'react';
import useAxios from "axios-hooks";
import axios from 'axios';

const AppContext = createContext();

export function AppWrapper({ children }) {

    const [{ data: folks, loading: folkLoading, error: folkError }, refetchFolks] = useAxios(
        "http://localhost:3000/api/folks"
    );


    const [{ data: battle, loading, error }, refetchBattle] = useAxios(
        "http://localhost:3000/api/folks/battle"
    );

    let sharedState = { battle, folks, refetchFolks, refetchBattle }

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}