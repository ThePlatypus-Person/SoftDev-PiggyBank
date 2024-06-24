import { useState, ReactNode, createContext } from 'react';
import { User } from '@/utils/types';

interface AuthContextProps {
    token: null | String;
    user: null | User;
    isAuthenticated: Boolean;
    setUser: (user: User) => void;
    authenticate: (token: String) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    token: null,
    user: null,
    isAuthenticated: false,
    setUser: (user: User) => {},
    authenticate: (token: String) => {},
    logout: () => {},
});


interface AuthContextProviderProps {
    children: ReactNode;
}

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [authToken, setAuthToken] = useState<null | String>(null);
    const [user, setUser] = useState<null | User>(null);

    function assignUser(user : User) {
        setUser(user);
    }

    function authenticate(token : String) {
        setAuthToken(token);
    }

    function logout() {
        setAuthToken(null);
        setUser(null);
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        user: user,
        setUser: assignUser,
        authenticate: authenticate,
        logout: logout,
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    );
}
