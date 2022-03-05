import { ConfirmationResult, UserCredential } from "firebase/auth";
import * as yup from "yup";
import { useForm } from "@p/form";

const CodeSchema = yup.object({
  code: yup.string().required(),
});
type CodeSchema = yup.InferType<typeof CodeSchema>;

export type CodeFormProps = {
  result: ConfirmationResult;
  onSubmit: (credentials: UserCredential) => void;
};

export function CodeForm({ result, onSubmit }: CodeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(CodeSchema);

  const submit = handleSubmit(async (data) => {
    const credentials = await result.confirm(data.code);
    onSubmit(credentials);
  });

  return (
    <form onSubmit={submit}>
      <input type="text" placeholder="code" {...register("code")} />
      {errors.code ? <span>{errors.code.message}</span> : null}
      <button type="submit">Submit</button>
    </form>
  );
}
