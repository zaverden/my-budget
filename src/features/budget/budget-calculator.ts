import { Either, left, right } from "@sweet-monads/either";
import { addDays, parseISO, startOfDay } from "date-fns";
import { InitialAmount, InitialAmountSchema, isRuleMatch, Rule } from "@p-features/rules/rules";
import { compareStrings } from "@p/utils";
import { MissingInitialAmountError } from "./errors/missing-initial-amount-error";

export type DateDelta = {
  date: Date;
  budgetAtStart: number;
  budgetAtEnd: number;
  rules: Rule[];
};

export class BudgetCalculator {
  private _rules: Rule[];

  private _initialDate: Date;

  private _lastProcessedDate: Date;

  private _dailyExpenses: number;

  private _calculated = new Map<number, DateDelta>();

  constructor(initialAmount: InitialAmount, rules: Rule[], dailyExpenses: number) {
    this._dailyExpenses = dailyExpenses;
    this._rules = rules;
    this._initialDate = parseISO(initialAmount.startDate);
    this._calculated.set(this._initialDate.getTime(), {
      date: this._initialDate,
      budgetAtStart: 0,
      budgetAtEnd: initialAmount.delta,
      rules: [initialAmount],
    });
    this._lastProcessedDate = this._initialDate;
  }

  getDateDelta(date: Date): DateDelta {
    const d = startOfDay(date);
    if (d < this._initialDate) {
      return {
        date: d,
        budgetAtStart: 0,
        budgetAtEnd: 0,
        rules: [],
      };
    }

    while (d > this._lastProcessedDate) {
      this._calcNextDay();
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- if we reached this line, `d` has been calculated
    return this._calculated.get(d.getTime())!;
  }

  private _calcNextDay() {
    const nextDay = addDays(this._lastProcessedDate, 1);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we sure that _lastProcessedDate is in _calculated
    const lastDelta = this._calculated.get(this._lastProcessedDate.getTime())!;
    const dayRules = this._rules.filter((rule) => isRuleMatch(nextDay, rule));
    const delta = dayRules.reduce((acc, rule) => acc + rule.delta, 0);
    const budgetAtStart = lastDelta.budgetAtEnd;
    const budgetAtEnd = budgetAtStart + delta - this._dailyExpenses;

    this._calculated.set(nextDay.getTime(), {
      date: nextDay,
      budgetAtStart,
      budgetAtEnd,
      rules: dayRules,
    });
    this._lastProcessedDate = nextDay;
  }

  static create(
    rules: Rule[],
    monthlyExpenses = 0
  ): Either<MissingInitialAmountError, BudgetCalculator> {
    const initials = rules
      .filter(InitialAmountSchema.guard)
      .sort((a, b) => -compareStrings(a.startDate, b.startDate));

    if (initials.length === 0) {
      return left(new MissingInitialAmountError());
    }

    return right(new BudgetCalculator(initials[0], rules, monthlyExpenses / 30));
  }
}
