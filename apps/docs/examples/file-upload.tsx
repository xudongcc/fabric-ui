"use client";

import { useState } from "react";

import { FileUpload } from "@/components/fabric-ui/file-upload";

const Example = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload
      multiple
      accept="image/*,.pdf"
      description="Drop files here, paste from your clipboard, or click to browse."
      label="Attachments"
      value={files}
      onChange={setFiles}
    />
  );
};

export default Example;
