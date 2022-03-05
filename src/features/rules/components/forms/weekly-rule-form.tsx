import { WeeklyYup, WeeklySchema, Weekly } from "@p-features/rules/rules";
import { useForm } from "@p/form";
import { BaseRuleForm } from "./_base-rule-form";

export type WeeklyRuleFormProps = {
  onSubmit?: (weekly: Weekly) => void;
  initial?: Weekly;
};

export function WeeklyRuleForm({ initial, onSubmit }: WeeklyRuleFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(WeeklyYup, { defaultValues: initial });

  const submit = handleSubmit(async (data) => {
    const weekly = WeeklySchema.check(data);
    onSubmit?.(weekly);
  });

  return (
    <form onSubmit={submit}>
      <input type="hidden" {...register("type", { value: "week" })} />
      <div>
        {WeeklySchema.fields.weekDay.getOptions().map((wd) => (
          <label key={wd}>
            <input {...register("weekDay")} type="radio" value={wd} />
            <span>{wd}</span>
          </label>
        ))}
        {errors.weekDay ? <p>{errors.weekDay?.message}</p> : null}
      </div>
      <BaseRuleForm register={register} errors={errors} />
      <button type="submit">Submit</button>
    </form>
  );
}
