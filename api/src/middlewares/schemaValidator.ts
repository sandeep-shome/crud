import { Request, Response, NextFunction } from "express";
import { Schema, ZodError } from "zod";
import { errorMessage } from "../helpers/errorMessage";

export const validateSchema =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      next(
        errorMessage(
          400,
          error.issues[0].message,
          error.stack!,
          "/api/v0/users/add",
          error.name
        )
      );
    }
  };
