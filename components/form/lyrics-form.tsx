"use client";
import { addLyrics, updateLyrics } from "@/app/action/lyrics";
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
import { useData } from "@/context/data-provider";
import type { Lyrics } from "@/generated/prisma";
import { lyricsSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ImageUploaderClient } from "../ui/ImageUploaderClient";
import { LoadingButton } from "../ui/loading-button";
import SingleSelect from "../ui/single-select";
import { SlugInput } from "../ui/slug-input";
import { Switch } from "../ui/switch";
import TagSelect from "../ui/tag-select";

const RichTextEditor = dynamic(
  () => import("@/components/ui/rich-text-editor"),
  {
    ssr: false,
  }
);

type lyricsFormValues = z.infer<typeof lyricsSchema>;

interface LyricsFormProps {
  onCloseForm?: () => void;
  item?: Lyrics;
}

export default function LyricsForm({ onCloseForm, item }: LyricsFormProps) {
  const isEditMode = !!item;
  const { tags, artists } = useData();

  const defaultValues: Partial<lyricsFormValues> = {
    title: item?.title || "",
    slug: item?.slug || "",
    imageUrl: item?.imageUrl || "",
    artistId: item?.artistId || "",
    body: item?.body || "",
    tags: item?.tags || [],
    favourite: item?.favourite || false,
    ytLink: item?.ytLink || "",
  };

  const form = useForm<lyricsFormValues>({
    resolver: zodResolver(lyricsSchema),
    defaultValues,
  });

  async function onSubmit(data: lyricsFormValues) {
    try {
      if (item) {
        await updateLyrics(item.id, data);
        toast.success("Lyrics Updated", {
          description: "Lyrics has been Updated successfully.",
        });
        if (onCloseForm) {
          onCloseForm();
        }
      } else {
        const result = await addLyrics(data);
        if (result.success) {
          toast.success("Lyrics Added", {
            description: "Lyrics has been Added successfully.",
          });
        } else {
          toast.error("Error", {
            description: "Something went wrong. Please try again.",
          });
        }

        if (onCloseForm) {
          onCloseForm();
        }
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
            {/*  Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Song Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <SlugInput
                      onGenerate={field.onChange}
                      initialValue={field.value}
                      placeholder="Slug"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  YtLink */}
            <FormField
              control={form.control}
              name="ytLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube Embed Link (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter YT link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  Artist */}
            <FormField
              control={form.control}
              name="artistId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artist</FormLabel>
                  <FormControl>
                    <SingleSelect
                      value={field.value}
                      onChange={field.onChange}
                      options={artists}
                      placeholder="Select an Artist"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagSelect
                      value={field.value}
                      onChange={field.onChange}
                      options={tags}
                      placeholder="Select or create tags"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  Image */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUploaderClient
                      uploadPreset="lyrics"
                      initialImage={field.value}
                      onImageUploaded={field.onChange}
                      aspectRatio={16 / 9}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  Body */}
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      onContentChange={field.onChange}
                      content={field.value as string}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  Favourite */}
            <FormField
              control={form.control}
              name="favourite"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Favourite</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
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

              <LoadingButton loading={form.formState.isSubmitting}>
                {isEditMode ? "Update" : "Add"} Lyrics
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
