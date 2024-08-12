interface CustomError extends Error {
  status: number;
  timeStamp: Date;
  path: string;
}

export const errorMessage = (
  status: number,
  message: string,
  stack: string,
  path: string,
  name: string
) => {
  const err: CustomError = {
    status,
    message,
    stack,
    path,
    name,
    timeStamp: new Date(Date.now()),
  };

  return err;
};
