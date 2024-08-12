import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTableRow from "../TableRow";
import { TABLEHEADERLIST } from "@/constants/tableHeader";
import TableRowSkeleton from "../TableRowSkeleton";
import { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { useToast } from "../ui/use-toast";
import { SortTypeContext } from "@/contexts/sortContext";
import { UsersContext } from "@/contexts/userContext";

const DataTable: React.FC = () => {
  const { usersData, setUsersData } = useContext(UsersContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { sortType } = useContext(SortTypeContext);

  const getUsersData = async () => {
    try {
      const res: AxiosResponse = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/users?sort=" + sortType
      );
      setUsersData(res.data.usersData);
      setIsLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.response?.data,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    }
  };

  useEffect(() => {
    getUsersData();
  }, [sortType]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {TABLEHEADERLIST.map((item) => (
              <TableHead className={item.className} key={item.id}>
                {item.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading &&
            Array(10).map((item, index) => <TableRowSkeleton key={index} />)}
          {usersData.map((user) => (
            <DataTableRow
              key={user._id}
              id={user._id}
              username={user.username}
              email={user.email}
              phone={user.phone}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DataTable;
