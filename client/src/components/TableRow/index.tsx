import { TableRowProps } from "@/types/tableRow";
import { TableCell, TableRow } from "../ui/table";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Trash, Pen } from "lucide-react";
import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios, { isAxiosError } from "axios";
import { useToast } from "../ui/use-toast";
import LoaderSpinner from "../LoaderSpinner";

const DataTableRow: React.FC<TableRowProps> = ({
  id,
  username,
  email,
  phone,
}) => {
  const delBtnRef = useRef<HTMLButtonElement>(null);
  const [userInput, setUserInput] = useState({
    username: username,
    phone: phone,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const btnRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpdateUser = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        import.meta.env.VITE_SERVER_URL + "/users/update/" + id,
        userInput
      );
      toast({
        description: "User has been updated.",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      if (isAxiosError(error)) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.response?.data.message,
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

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        import.meta.env.VITE_SERVER_URL + "/users/delete/" + id
      );
      toast({
        description: "User has been deleted permanently.",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      if (isAxiosError(error)) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.response?.data.message,
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

  return (
    <>
      <TableRow key={id}>
        <TableCell className="font-medium">{id}</TableCell>
        <TableCell className="">{username}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell className="text-right">
          <ContextMenu>
            <ContextMenuTrigger>
              <span className="">
                <span className="material-symbols-outlined text-neutral-500 text-xl cursor-pointer">
                  more_vert
                </span>
              </span>
            </ContextMenuTrigger>

            <ContextMenuContent>
              <ContextMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  btnRef.current?.click();
                }}
              >
                <Pen className="size-3.5 text-neutral-700" />
                Edit
              </ContextMenuItem>
              <ContextMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  delBtnRef.current?.click();
                }}
              >
                <Trash className="size-3.5 text-neutral-700" />
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </TableCell>
      </TableRow>

      <Dialog>
        <DialogTrigger asChild>
          <button className="hidden" ref={btnRef}></button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your user profile here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Name
              </Label>
              <Input
                id="username"
                value={userInput.username}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" value={email} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={userInput.phone}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => handleUpdateUser()}
              className="flex items-center justify-center min-w-24 select-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoaderSpinner className="size-6" />
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogTrigger>
          <button className="hidden" ref={delBtnRef}></button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DataTableRow;
