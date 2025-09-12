"use client";

import { deletePoem } from "@/app/action/poem";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Poem } from "@/generated/prisma";
import { Pen, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import PoemForm from "../form/poem-form";
import { ConfirmDialog } from "../ui/confirm-dialog";

export default function PoemAction({ poem }: { poem: Poem }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { data, status } = useSession();
  if (status !== "authenticated" || !data.user?.name) return null;

  async function handleDelete() {
    try {
      const result = await deletePoem(poem.id);

      if (result.success) {
        toast.success("Poem Deleted", {
          description: "Poem has been deleted successfully.",
        });
        setIsDeleteDialogOpen(false);
      } else {
        toast.error("Failed to delete poem.");
      }
    } catch {
      toast.error("Something went wrong while deleting.");
    }
  }

  return (
    <div className="pb-6">
      <div className="flex items-center justify-center gap-3">
        {/* Edit button */}
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Pen size={18} />
          Edit Poem
        </Button>

        {/* Delete button */}
        <Button
          onClick={() => setIsDeleteDialogOpen(true)}
          className="flex items-center gap-2"
          variant="destructive"
        >
          <Trash size={18} />
          Delete
        </Button>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="min-w-[calc(100%-100px)] bg-muted p-0 py-4">
          <DialogHeader>
            <DialogTitle className="px-4">Edit</DialogTitle>
            <DialogDescription className="hidden" />
          </DialogHeader>
          <PoemForm poem={poem} onCloseForm={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        title="Delete Poem"
        description="Are you sure you want to delete this poem? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
        confirmClassName="bg-destructive text-white hover:bg-destructive/90"
      />
    </div>
  );
}
