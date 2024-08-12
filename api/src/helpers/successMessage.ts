interface SuccessMessage {
  status: number;
  message: string;
}
export const successMessage = (status: number, message: string) => {
  const success: SuccessMessage = {
    status,
    message,
  };

  return success;
};
