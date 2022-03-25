import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type ControlledTextFieldProps = "onChange" | "onBlur" | "value" | "name" | "error" | "helperText";

export type FormTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Exclude<ControllerProps<TFieldValues, TName>["control"], undefined>;
  name: ControllerProps<TFieldValues, TName>["name"];
  rules?: ControllerProps<TFieldValues, TName>["rules"];
  shouldUnregister?: ControllerProps<TFieldValues, TName>["shouldUnregister"];
  defaultValue?: ControllerProps<TFieldValues, TName>["defaultValue"];
} & Omit<TextFieldProps, ControlledTextFieldProps>;

export function FormTextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  rules,
  shouldUnregister,
  defaultValue,
  ...textFieldProps
}: FormTextFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <TextField
          {...textFieldProps}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          name={field.name}
          error={fieldState.invalid}
          helperText={fieldState.error?.message ?? null}
        />
      )}
    />
  );
}
