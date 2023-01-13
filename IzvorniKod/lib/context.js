import { createContext, useContext } from 'react';
import { useFirebaseAuth } from './firebase';

// stvara kontekst za korisnika
const authUserContext = createContext({ 
    authUser: null,
    loading: true,
    firebaseEmailPassSignIn: async () => {},
    firebaseCreateUserEmailPass: async () => {},
    firebaseSignOut: async () => {},
})

// hook koji koristimo za dohvat konteksta
export function AuthUserProvider({ children }) {
    const auth = useFirebaseAuth();
    return (
        // koristimo kontekst i proslijedimo mu vrijednosti
        <authUserContext.Provider value={auth}>
            {children}
        </authUserContext.Provider>
    );
}

export const useAuth = () => useContext(authUserContext);