import { CustomError } from "ts-custom-error";

export class ExhaustiveError extends CustomError {
  constructor(message: string, _v: never) {
    super(message);
  }
}
