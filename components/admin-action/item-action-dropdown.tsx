"use client";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface ItemActionDropdownProps<T> {
  name: string; // e.g., "Lyrics", "Album"
  item: T;
  EditForm: React.ComponentType<{ item: T; onCloseForm: () => void }>;
  onDelete: (item: T) => Promise<void>;
}

export function ItemActionDropdown<T>({
  name,
  item,
  EditForm,
  onDelete,
}: ItemActionDropdownProps<T>) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, status } = useSession();
  if (status !== "authenticated" || !data.user?.name) return null;

  async function handleDelete() {
    try {
      await onDelete(item);
      toast.success(`${name} deleted successfully!`);
      setIsDeleteOpen(false);
    } catch {
      toast.error(`Failed to delete ${name}`);
    }
  }

  const actions = [
    {
      label: `Edit ${name}`,
      onClick: () => setIsEditOpen(true),
    },
    {
      label: `Delete ${name}`,
      onClick: () => setIsDeleteOpen(true),
      destructive: true,
    },
  ];

  return (
    <>
      {/* Dropdown Trigger */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="!px-[10] cursor-pointer rounded-full"
          >
            <MoreVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {actions.map((action, idx) => (
            <DropdownMenuItem
              key={idx}
              onClick={action.onClick}
              className={action.destructive ? "text-destructive" : ""}
            >
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="min-w-[calc(100%-100px)] bg-muted p-0 py-4">
          <DialogHeader>
            <DialogTitle className="px-4">Edit {name}</DialogTitle>
          </DialogHeader>
          <EditForm item={item} onCloseForm={() => setIsEditOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={isDeleteOpen}
        title={`Delete ${name}`}
        description={`Are you sure you want to delete this ${name}? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
        confirmClassName="bg-destructive text-white hover:bg-destructive/90"
      />
    </>
  );
}
