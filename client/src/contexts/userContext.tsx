import { createContext, useState } from "react";
interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface UsersContext {
  usersData: User[];
  setUsersData: any;
}
export const UsersContext = createContext<UsersContext>({
  usersData: [],
  setUsersData: null,
});

const UsersContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [usersData, setUsersData] = useState([]);
  return (
    <UsersContext.Provider value={{ usersData, setUsersData }}>
      {children}
    </UsersContext.Provider>
  );
};
export default UsersContextProvider;
