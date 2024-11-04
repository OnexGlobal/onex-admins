import { createContext, FC, ReactNode, useEffect, useState } from "react";

const user_data = localStorage.getItem("user");
const AuthContext = createContext(undefined as any);
const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<null | Record<string, string>>(null);

  useEffect(() => {
    try {
      if (user_data) setAuth(true);
      if (user_data) {
        setUser(JSON.parse(user_data));
      }
    } finally {
      setLoading(false);
    }
  }, [user_data]);
  return (
    <AuthContext.Provider
      value={{
        setLoading,
        setAuth,
        auth,
        loading,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
