import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useForm } from "@p/form";
import { FormTextField } from "@p/ui-kit";
import { Y } from "@p/yup";

const MonthlyExpensesFormSchema = Y.object({
  expenses: Y.number().required().integer().min(0),
});

export type MonthlyExpensesDialogContentProps = {
  initial: number;
  onCancel: () => void;
  onSubmit: (expenses: number) => void;
};

export function MonthlyExpensesDialogContent({
  initial,
  onSubmit,
  onCancel,
}: MonthlyExpensesDialogContentProps) {
  const { control, handleSubmit } = useForm(MonthlyExpensesFormSchema, {
    defaultValues: { expenses: initial },
  });

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data.expenses);
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <DialogTitle>Enter monthly expenses</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Provided amount will be divided by 30. Result amount will be silently subtracted every
          day.
        </DialogContentText>
        <FormTextField
          control={control}
          name="expenses"
          autoFocus
          margin="dense"
          label="Monthly expenses"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </form>
  );
}
