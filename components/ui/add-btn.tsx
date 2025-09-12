"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { JSX, useState } from "react";

interface AddBtnProps {
  title: string;
  FormComponent: (props: { onCloseForm: () => void }) => JSX.Element;
}

export function AddBtn({ title, FormComponent }: AddBtnProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="flex w-full items-center gap-2"
      >
        <Plus size={18} />
        {title}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="min-w-[calc(100%-100px)] bg-muted p-0 py-4 !max-w-6xl">
          <DialogHeader>
            <DialogTitle className="px-4">{title}</DialogTitle>
          </DialogHeader>
          <FormComponent onCloseForm={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
