import { useContext } from "react";
import { Button } from "../ui/button";
import { UsersContext } from "@/contexts/userContext";
import * as XLSX from "xlsx";

const ExportButton = () => {
  const { usersData } = useContext(UsersContext);
  const exportAsCsv = () => {
    try {
      const workbook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(usersData);
      XLSX.utils.book_append_sheet(workbook, workSheet);
      XLSX.writeFile(workbook, "data.xlsx");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Button variant={"outline"} onClick={exportAsCsv}>
        Export
      </Button>
    </>
  );
};

export default ExportButton;
