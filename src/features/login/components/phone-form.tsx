import { ConfirmationResult } from "firebase/auth";
import * as yup from "yup";
import { useForm } from "@p/form";
import { useRecaptchaVerifier, useSignInWithPhoneNumber } from "@p/hooks";

const PhoneSchema = yup.object({
  phone: yup.string().required(),
});

export type PhoneFormProps = {
  onSubmit: (result: ConfirmationResult) => void;
};

export function PhoneForm({ onSubmit }: PhoneFormProps) {
  const { verifierBoxRef, getRecaptchaVerifier } = useRecaptchaVerifier<"div">();
  const signInWithPhoneNumber = useSignInWithPhoneNumber(getRecaptchaVerifier);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(PhoneSchema);

  const submit = handleSubmit(async (data) => {
    const result = await signInWithPhoneNumber(data.phone);
    onSubmit(result);
  });

  return (
    <form onSubmit={submit}>
      <input type="tel" placeholder="phone" {...register("phone")} />
      {errors.phone ? <span>{errors.phone.message}</span> : null}
      <button type="submit">Submit</button>
      <div ref={verifierBoxRef} />
    </form>
  );
}
