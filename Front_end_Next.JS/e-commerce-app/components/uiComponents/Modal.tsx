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
import { AddressType } from "@/lib/type";

interface Props {
  children: React.ReactNode;
  userHaveReview?: boolean;
  updateReviewModal?: boolean;
  addressForm?: boolean;
  address?: AddressType | undefined
}

export const Modal = ({ children, userHaveReview = false, updateReviewModal = false ,addressForm = false, address}: Props) => {
  // Cache seulement le bouton "ajouter" si l'utilisateur a déjà un avis
  if (userHaveReview && !updateReviewModal) {
    return null;
  }

 return (
    <Dialog>
      <DialogTrigger asChild>
        {
          updateReviewModal ? (
            <button
              type="button"
              className="bg-gray-200 p-2 rounded-md cursor-pointer transition-all hover:bg-gray-300"
            >
              <PenIcon className="size-5 text-gray-600" />
            </button>
          ) : addressForm ? (
            <Button className="nav-btn">{address?.city?"Update Address" : "Add Address"}</Button>
          ) : (
            <Button className="default-btn max-sm:text-[12px] max-sm:px-4 my-6">
              Click to add a review
            </Button>
          )
        }
      </DialogTrigger>
      <DialogContent className="px-2 py-2">
        <DialogHeader>
          <DialogTitle className="sr-only">Review</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
