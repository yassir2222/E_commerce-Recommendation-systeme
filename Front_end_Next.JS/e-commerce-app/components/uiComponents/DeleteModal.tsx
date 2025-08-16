import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TrashIcon } from "lucide-react"

const DeleteModal = ({handleDeleteReview}: {handleDeleteReview: () => void}) =>{
return(
    <AlertDialog>
    <AlertDialogTrigger asChild>

    <button className="bg-gray-200 p-2 rounded-md cursor-pointer transition-all hover:bg-gray-300">
    <TrashIcon className="size-5" />
    </button>

    </AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the review on this product
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
        <AlertDialogAction className="cursor-pointer" onClick={handleDeleteReview}>Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
)
}

export default DeleteModal;
