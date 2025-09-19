"use client";

import { addPoet, updatePoet } from "@/app/action/poet";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Poet } from "@/generated/prisma";
import { poetSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ImageUploaderClient } from "../ui/ImageUploaderClient";
import { LoadingButton } from "../ui/loading-button";
import { SlugInput } from "../ui/slug-input";

type poetFormValues = z.infer<typeof poetSchema>;

interface PoetFormProps {
  onCloseForm: () => void;
  item?: Poet;
}

export default function PoetForm({ onCloseForm, item }: PoetFormProps) {
  const isEditMode = !!item;

  const defaultValues: Partial<poetFormValues> = {
    name: item?.name || "",
    imageUrl: item?.imageUrl || "",
    slug: item?.slug || "",
  };

  const form = useForm<poetFormValues>({
    resolver: zodResolver(poetSchema),
    defaultValues,
  });

  async function onSubmit(data: poetFormValues) {
    try {
      if (item) {
        await updatePoet(item.id, data);
        toast.success("poet Updated", {
          description: "poet has been Updated successfully.",
        });
        onCloseForm();
      } else {
        const result = await addPoet(data);
        if (result.success) {
          toast.success("Poet Added", {
            description: "Poet has been Added successfully.",
          });
        } else {
          toast.error("Error", {
            description: "Something went wrong. Please try again.",
          });
        }

        onCloseForm();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    }
  }

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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Poet Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <SlugInput
                      initialValue={field.value}
                      onGenerate={field.onChange}
                      placeholder="Link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={() => (
                <FormItem className="text-center">
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUploaderClient
                      uploadPreset="poetss"
                      initialImage={form.watch("imageUrl")}
                      onImageUploaded={(imageUrl: string) =>
                        form.setValue("imageUrl", imageUrl)
                      }
                      aspectRatio={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                onClick={() => onCloseForm()}
                variant="outline"
              >
                Cancel
              </Button>

              <LoadingButton loading={form.formState.isSubmitting}>
                {isEditMode ? "Update" : "Add"} Poet
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
