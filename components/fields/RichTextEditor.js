"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
let Quill;
let QuillTableBetter;

if (typeof window !== "undefined") {
  Quill = require("react-quill-new").Quill;
  QuillTableBetter = require("quill-table-better");
  Quill.register(
    {
      "modules/table-better": QuillTableBetter,
    },
    true
  );
}

import "react-quill-new/dist/quill.snow.css";
import "react-quill-new/dist/quill.bubble.css";
import "quill-table-better/dist/quill-table-better.css";
import { Typography } from "@mui/material";

const RichTextEditor = ({ text = "", onChange, label = "توضیحات" }) => {
  const quillEditRef = useRef(null);
  const [value, setValue] = useState(text);

  // Update local state if text changes from props
  useEffect(() => {
    setValue(text);
  }, [text]);

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
    if (onChange) onChange(content); // pass content to RHF
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: 1 }, { header: 2 }],
          ["bold", "italic", "underline", "strike"],
          ["link", "image"],
          [{ list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["table-better"],
        ],
      },
      table: false,
      "table-better": {
        language: "en_US",
        menus: ["column", "row", "merge", "table", "cell", "wrap", "delete"],
        toolbarTable: true,
      },
      keyboard: {
        bindings: QuillTableBetter?.keyboardBindings,
      },
    }),
    []
  );

  return (
    <>
    <Typography mb={1} variant="body2">
      { label }
    </Typography>

    <ReactQuill
      ref={quillEditRef}
      value={value}        // <-- controlled value
      onChange={handleChange} // <-- propagate changes
      theme="snow"
      modules={modules}
    />
      </>
  );
};

export default RichTextEditor;
