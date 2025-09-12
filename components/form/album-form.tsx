"use client";

import { addAlbum, updateAlbum } from "@/app/action/album";
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
import type { Album } from "@/generated/prisma";
import { albumSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ImageUploaderClient } from "../ui/ImageUploaderClient";
import { LoadingButton } from "../ui/loading-button";
import { SlugInput } from "../ui/slug-input";

type albumFormValues = z.infer<typeof albumSchema>;

interface AlbumFormProps {
  onCloseForm: () => void;
  album?: Album;
}

export default function AlbumForm({ onCloseForm, album }: AlbumFormProps) {
  const isEditMode = !!album;

  const defaultValues: Partial<albumFormValues> = {
    name: album?.name || "",
    imageUrl: album?.imageUrl || "",
    slug: album?.slug || "",
  };

  const form = useForm<albumFormValues>({
    resolver: zodResolver(albumSchema),
    defaultValues,
  });

  async function onSubmit(data: albumFormValues) {
    try {
      if (album) {
        await updateAlbum(album.id, data);
        toast.success("Album Updated", {
          description: "Album has been Updated successfully.",
        });
        onCloseForm();
      } else {
        const result = await addAlbum(data);
        if (result.success) {
          toast.success("Album Added", {
            description: "Album has been Added successfully.",
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
                    <Input placeholder="Enter Album Name" {...field} />
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
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <SlugInput
                      onGenerate={(slug: string) => form.setValue("slug", slug)}
                      placeholder="Slug"
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
                      uploadPreset="albums"
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
                {isEditMode ? "Update" : "Add"} Album
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
