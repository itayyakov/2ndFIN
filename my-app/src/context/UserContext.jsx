import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
            }}
        >
        {children}
    </UserContext.Provider>
    );
}

export const User = () => {
    return useContext(UserContext);
}