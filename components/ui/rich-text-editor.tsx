"use client";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface SectionProps {
  content: string;
  onContentChange: (content: string) => void;
}
export default function RichTextEditor({
  content,
  onContentChange,
}: SectionProps) {
  const modules = {
    syntax: false, // enable code highlighting if desired
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ header: 1 }, { header: 2 }, "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ direction: "rtl" }, { align: [] }],
      ["link", "image", "video", "formula"],
      ["clean"],
    ],
  };
  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "list",
    "align",
    "direction",
    "link",
    "image",
    "video",
    "formula",
    "table",
  ];

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={onContentChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
