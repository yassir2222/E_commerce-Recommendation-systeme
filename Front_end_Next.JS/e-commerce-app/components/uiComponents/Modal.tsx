import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "./Button";
import { PenIcon } from "lucide-react";

interface Props {
  children: React.ReactNode;
  userHaveReview?: boolean;
  updateReviewModal?: boolean;
}

export const Modal = ({ children, userHaveReview = false, updateReviewModal = false }: Props) => {
  // Cache seulement le bouton "ajouter" si l'utilisateur a déjà un avis
  if (userHaveReview && !updateReviewModal) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {updateReviewModal ? (
          <button
            type="button"
            className="bg-gray-200 p-2 rounded-md cursor-pointer transition-all hover:bg-gray-300"
          >
            <PenIcon className="size-5 text-gray-600" />
          </button>
        ) : (
          <Button className="default-btn max-sm:text-[12px] max-sm:px-4 my-6">
            Click to add a review
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Review</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
