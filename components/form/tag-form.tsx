"use client";
import { updateTags } from "@/app/action/tag";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useData } from "@/context/data-provider";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoadingButton } from "../ui/loading-button";
import TagInput from "../ui/tag-input";

interface TagFormProps {
  onCloseForm?: () => void;
}

export default function TagForm({ onCloseForm }: TagFormProps) {
  const { tags } = useData();

  const defaultValues = {
    tag: tags || [],
  };

  const form = useForm({
    defaultValues,
  });

  async function onSubmit(data: { tag: string[] }) {
    try {
      await updateTags(data.tag);
      toast.success("Tags Updated", {
        description: "Tags has been Updated successfully.",
      });
      if (onCloseForm) {
        onCloseForm();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    }
  }

  const currentTags = form.watch("tag"); // watch current tag array

  // check if Save button should be disabled
  const isSaveDisabled =
    currentTags.length === 0 || // no tags
    JSON.stringify(currentTags) === JSON.stringify(defaultValues.tag);

  return (
    <div className="relative qualification w-full bg-white max-h-[calc(100vh-100px)] overflow-y-auto">
      <div className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 relative"
          >
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagInput
                      tags={field.value}
                      onChangeTags={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                onClick={() => {
                  if (onCloseForm) {
                    onCloseForm();
                  }
                }}
                variant="outline"
              >
                Cancel
              </Button>

              <LoadingButton
                disabled={isSaveDisabled}
                loading={form.formState.isSubmitting}
              >
                Save Tag
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
