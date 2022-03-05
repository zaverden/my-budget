import { OneTimeYup, OneTimeSchema, OneTime } from "@p-features/rules/rules";
import { useForm } from "@p/form";
import { BaseRuleForm } from "./_base-rule-form";

export type OneTimeRuleFormProps = {
  onSubmit?: (oneTime: OneTime) => void;
  initial?: OneTime;
};

export function OneTimeRuleForm({ initial, onSubmit }: OneTimeRuleFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(OneTimeYup, { defaultValues: initial });

  const submit = handleSubmit(async (data) => {
    const oneTime = OneTimeSchema.check(data);
    onSubmit?.(oneTime);
  });

  return (
    <form onSubmit={submit}>
      <input type="hidden" {...register("type", { value: "month" })} />
      <BaseRuleForm register={register} errors={errors} noEndDate />
      <button type="submit">Submit</button>
    </form>
  );
}
