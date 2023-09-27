import httpStatus from "http-status";
import { CustomError } from "./CustomError";

export class BadRequestError extends CustomError {
  message: string;
  constructor(message: string) {
    super(httpStatus.BAD_REQUEST, message);
    this.message = message;
  }
}