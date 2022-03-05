import { CustomError } from "ts-custom-error";

export class MissingInitialAmountError extends CustomError {
  constructor() {
    super("Missing initial amount rule in the rules list");
  }
}
