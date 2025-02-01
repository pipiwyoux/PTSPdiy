import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isSubmitting: boolean;
  onCancel?: () => void;
}

const FormActions = ({ isSubmitting, onCancel }: FormActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Menyimpan..." : "Simpan"}
      </Button>
      {onCancel && (
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
      )}
    </div>
  );
};

export default FormActions;
