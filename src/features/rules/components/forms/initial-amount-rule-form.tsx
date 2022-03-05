import { InitialAmount, InitialAmountSchema, InitialAmountYup } from "@p-features/rules/rules";
import { useForm } from "@p/form";
import { BaseRuleForm } from "./_base-rule-form";

export type InitialAmountFormProps = {
  onSubmit?: (initialAmount: InitialAmount) => void;
  initial?: InitialAmount;
};

export function InitialAmountForm({ initial, onSubmit }: InitialAmountFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(InitialAmountYup, { defaultValues: initial });

  const submit = handleSubmit(async (data) => {
    const initialAmount = InitialAmountSchema.check(data);
    onSubmit?.(initialAmount);
  });

  return (
    <form onSubmit={submit}>
      <input type="hidden" {...register("type", { value: "month" })} />
      <BaseRuleForm register={register} errors={errors} noEndDate />
      <button type="submit">Submit</button>
    </form>
  );
}
