import httpStatus from "http-status";
import { CustomError } from "./CustomError";

export class UnauthorizedError extends CustomError {
  message: string;
  constructor(message: string) {
    super(httpStatus.UNAUTHORIZED, message);
    this.message = message;
  }
}