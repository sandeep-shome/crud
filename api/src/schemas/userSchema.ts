import { z } from "zod";
const userSchema = z.object({
  username: z
    .string({ required_error: "username must be provided" })
    .min(3, { message: "username must be at least 3 characters" })
    .max(255, { message: "username must be with in 255 characters" }),
  email: z
    .string({ required_error: "email must be provided" })
    .email({ message: "email must be an valid email address" })
    .min(3, { message: "email must be at least 3 characters" })
    .max(255, { message: "email must be with in 255 characters" }),
  phone: z.string({ required_error: "phone must be provided" }),
});

export default userSchema;
