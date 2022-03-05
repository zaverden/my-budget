import { MonthlyYup, MonthlySchema, Monthly } from "@p-features/rules/rules";
import { useForm } from "@p/form";
import { FormField } from "@p/ui-kit";
import { BaseRuleForm } from "./_base-rule-form";

export type MonthlyRuleFormProps = {
  onSubmit?: (monthly: Monthly) => void;
  initial?: Monthly;
};

export function MonthlyRuleForm({ initial, onSubmit }: MonthlyRuleFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(MonthlyYup, { defaultValues: initial });

  const submit = handleSubmit(async (data) => {
    const monthly = MonthlySchema.check(data);
    onSubmit?.(monthly);
  });

  return (
    <form onSubmit={submit}>
      <input type="hidden" {...register("type", { value: "month" })} />
      <FormField label="monthDay" error={errors.monthDay?.message}>
        <input type="number" {...register("monthDay")} />
      </FormField>
      <BaseRuleForm register={register} errors={errors} />
      <button type="submit">Submit</button>
    </form>
  );
}
