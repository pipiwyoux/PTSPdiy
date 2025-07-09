import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IncomingMail } from "@/types/admin";
import DispositionPreview from "./DispositionPreview";

interface DispositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mail: IncomingMail;
}

const DispositionModal = ({ isOpen, onClose, mail }: DispositionModalProps) => {
  const handlePrint = () => {
    const printContent = document.querySelector('.print-container');
    const originalContent = document.body.innerHTML;
    
    if (printContent) {
      document.body.innerHTML = printContent.outerHTML;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); // Reload to restore React functionality
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Pratinjau Disposisi</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-end sticky top-0 bg-white z-10 py-2">
            <Button onClick={handlePrint}>
              Cetak Disposisi
            </Button>
          </div>
          <div className="flex justify-center items-center bg-gray-100 p-4">
            <DispositionPreview mail={mail} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DispositionModal;
