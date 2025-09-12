"use client";
import { addArtist, updateArtist } from "@/app/action/artist";
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
import type { Artist } from "@/generated/prisma";
import { artistSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ImageUploaderClient } from "../ui/ImageUploaderClient";
import { LoadingButton } from "../ui/loading-button";
import { SlugInput } from "../ui/slug-input";

type artistFormValues = z.infer<typeof artistSchema>;

interface ArtistFormProps {
  onCloseForm: () => void;
  artist?: Artist;
}

export default function ArtistForm({ onCloseForm, artist }: ArtistFormProps) {
  const isEditMode = !!artist;

  const defaultValues: Partial<artistFormValues> = {
    name: artist?.name || "",
    imageUrl: artist?.imageUrl || "",
    slug: artist?.slug || "",
  };

  const form = useForm<artistFormValues>({
    resolver: zodResolver(artistSchema),
    defaultValues,
  });

  async function onSubmit(data: artistFormValues) {
    try {
      if (artist) {
        await updateArtist(artist.id, data);
        toast.success("Artist Updated", {
          description: "Artist has been Updated successfully.",
        });
        onCloseForm();
      } else {
        const result = await addArtist(data);
        if (result.success) {
          toast.success("Artist Added", {
            description: "Artist has been Added successfully.",
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
                    <Input placeholder="Enter Artist Name" {...field} />
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
                      uploadPreset="artist"
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
                {isEditMode ? "Update" : "Add"} Artist
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
