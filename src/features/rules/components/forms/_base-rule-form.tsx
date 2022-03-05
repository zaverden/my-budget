import { Fragment } from "react";
import { BaseRuleYup } from "@p-features/rules/rules/_base-rule";
import { UseFormRegister, FieldError, FieldErrors, Path } from "@p/form";
import { None } from "@p/ts";
import { FormField } from "@p/ui-kit";
import { Y } from "@p/yup";

type BaseRule = Y.InferType<typeof BaseRuleYup>;

export type BaseRuleFormProps<TFieldValues extends BaseRule> = {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  noEndDate?: boolean;
};

export function BaseRuleForm<TFieldValues extends BaseRule>({
  register,
  errors,
  noEndDate = false,
}: BaseRuleFormProps<TFieldValues>) {
  return (
    <Fragment>
      <FormField label="delta" error={errors.delta?.message}>
        <input type="number" {...register("delta" as Path<TFieldValues>)} />
      </FormField>
      <FormField label="name" error={errors.name?.message}>
        <input type="text" {...register("name" as Path<TFieldValues>)} />
      </FormField>
      <FormField label="startDate" error={(errors.startDate as None<FieldError>)?.message}>
        <input type="date" {...register("startDate" as Path<TFieldValues>)} />
      </FormField>
      {noEndDate ? null : (
        <FormField label="endDate" error={(errors.endDate as None<FieldError>)?.message}>
          <input type="date" {...register("endDate" as Path<TFieldValues>)} />
        </FormField>
      )}
    </Fragment>
  );
}
