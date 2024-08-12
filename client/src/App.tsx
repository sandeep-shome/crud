import Header from "./components/Header";
import DataTable from "./components/Table";
import { Toaster } from "./components/ui/toaster";
import SortTypeContextProvider from "./contexts/sortContext";
import UsersContextProvider from "./contexts/userContext";

const App: React.FC = () => {
  return (
    <>
      <UsersContextProvider>
        <SortTypeContextProvider>
          <Toaster />
          <Header />
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <DataTable />
          </div>
        </SortTypeContextProvider>
      </UsersContextProvider>
    </>
  );
};

export default App;
