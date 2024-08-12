import { createContext, useState } from "react";
interface SortTypeContext {
  sortType: string;
  setSortType: any;
}
export const SortTypeContext = createContext<SortTypeContext>({
  sortType: "",
  setSortType: null,
});

const SortTypeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sortType, setSortType] = useState("-createdAt");
  return (
    <SortTypeContext.Provider value={{ sortType, setSortType }}>
      {children}
    </SortTypeContext.Provider>
  );
};
export default SortTypeContextProvider;
