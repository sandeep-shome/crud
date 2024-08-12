import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import logo from "@/assets/logo.svg";
import AddBlogButton from "../AddBlogButton";
import { useContext } from "react";
import { SortTypeContext } from "@/contexts/sortContext";
import { SORTOPTIONS } from "@/constants/sortOptions";
import ExportButton from "../ExportButton";
const Header = () => {
  const { setSortType, sortType } = useContext(SortTypeContext);

  return (
    <>
      <header className="bg-white">
        <div className="mx-auto flex items-center justify-between h-16 max-w-screen-xl gap-8 px-4 sm:px-6 lg:px-10">
          <div className="block">
            <span className="sr-only">Home</span>
            <img src={logo} alt="" />
          </div>

          <div className="flex items-center gap-2">
            <Select
              onValueChange={(e) => setSortType(e)}
              defaultValue={sortType}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  {SORTOPTIONS.map((option, index) => (
                    <SelectItem value={option.value} key={index}>
                      {option.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <AddBlogButton />
            <ExportButton />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
