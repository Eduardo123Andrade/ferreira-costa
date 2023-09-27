import httpStatus from "http-status";
import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
  message: string;
  constructor(message: string) {
    super(httpStatus.NOT_FOUND, message);
    this.message = message;
  }
}