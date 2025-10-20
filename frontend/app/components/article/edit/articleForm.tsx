import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import EditorJS from "@editorjs/editorjs";
import { editorjsTools } from "./editorjs-tools";
import {
  Form as ShadcnForm,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import type { OutputData } from "@editorjs/editorjs";
import type { ArticleFormData } from "~/types/article";

interface ArticleFormProps {
  defaultValues?: {
    title?: string;
    summary?: string;
    content?: OutputData;
  };
  onSubmitData: (data: ArticleFormData) => Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function ArticleForm({
  defaultValues,
  onSubmitData,
  isSubmitting,
  submitLabel = "Save",
}: ArticleFormProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const form = useForm({
    defaultValues: {
      title: defaultValues?.title || "",
      summary: defaultValues?.summary || "",
    },
  });

  useEffect(() => {
    if (editorRef.current) return;

    const editor = new EditorJS({
      holder: "editorjs",
      data: defaultValues?.content,
      autofocus: true,
      tools: editorjsTools,
      minHeight: 0,
      tunes: ["textVariant"],
    });

    editorRef.current = editor;
  }, []);

  const handleSubmit = async (data: { title: string; summary: string }) => {
    try {
      if (!editorRef.current) throw new Error("Editor not found");
      const content = await editorRef.current.save();
      await onSubmitData({ ...data, content });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <ShadcnForm {...form}>
      <form
        className="pb-10 mx-auto space-y-6 max-w-3xl"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter title"
                  required
                  maxLength={200}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter short summary"
                  required
                  maxLength={500}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Content</FormLabel>
          <div
            id="editorjs"
            className="p-3 py-2 px-3 text-base bg-transparent rounded-md border border-input shadow-xs focus-visible:ring-[3px]"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : submitLabel}
          </Button>
        </div>
      </form>
    </ShadcnForm>
  );
}
