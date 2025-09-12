"use client";
import { addPoem, updatePoem } from "@/app/action/poem";
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
import type { Poem } from "@/generated/prisma";
import { poemSchema } from "@/lib/zod";
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

type PoemFormValues = z.infer<typeof poemSchema>;

interface PoemFormProps {
  onCloseForm?: () => void;
  poem?: Poem;
}

export default function PoemForm({ onCloseForm, poem }: PoemFormProps) {
  const isEditMode = !!poem;
  const { tags, poets } = useData();

  const defaultValues: Partial<PoemFormValues> = {
    title: poem?.title || "",
    slug: poem?.slug || "",
    imageUrl: poem?.imageUrl || "",
    poetId: poem?.poetId || "",
    body: poem?.body || "",
    tags: poem?.tags || [],
    favourite: poem?.favourite || false,
    ytLink: poem?.ytLink || "",
  };

  const form = useForm<PoemFormValues>({
    resolver: zodResolver(poemSchema),
    defaultValues,
  });

  async function onSubmit(data: PoemFormValues) {
    try {
      if (poem?.id) {
        await updatePoem(poem.id, data);
        toast.success("Poem Updated", {
          description: "Poem has been Updated successfully.",
        });
        if (onCloseForm) {
          onCloseForm();
        }
      } else {
        const result = await addPoem(data);
        if (result.success) {
          toast.success("Poem Added", {
            description: "Poem has been Added successfully.",
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
                    <Input placeholder="Enter Poem Title" {...field} />
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
                      initialValue={field.value}
                      onGenerate={field.onChange}
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

            {/*  Poet */}
            <FormField
              control={form.control}
              name="poetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artist</FormLabel>
                  <FormControl>
                    <SingleSelect
                      value={field.value}
                      onChange={field.onChange}
                      options={poets}
                      placeholder="Select an Poet"
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
                      uploadPreset="poemss"
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
                {isEditMode ? "Update" : "Add"} Poem
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
