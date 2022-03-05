import { Either, right, left } from "@sweet-monads/either";
import { Failure, Result } from "runtypes";

export function toEither<T>(result: Result<T>): Either<Failure, T> {
  return result.success ? right(result.value) : left(result);
}
