import { useForm as useFormBase, UseFormProps, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnyObjectSchema, InferType } from "yup";

export function useForm<TSchema extends AnyObjectSchema, TContext = unknown>(
  schema: TSchema,
  props?: Omit<UseFormProps<InferType<TSchema>, TContext>, "resolver">
): UseFormReturn<InferType<TSchema>, TContext> {
  return useFormBase({
    ...props,
    resolver: yupResolver(schema),
  });
}

export * from "react-hook-form";
