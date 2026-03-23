import { createContext, useContext, useState, useMemo } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    // TODO : gérer avec le back le social login
    const [admin, setAdmin] = useState({"mail": "admin@profilresearch.com", "name": "Admin"}); // null = non connecté, { name, email } = connecté

    // admin sera recréé que si admin change
    const value = useMemo(() => ({ admin, setAdmin }), [admin]);

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);