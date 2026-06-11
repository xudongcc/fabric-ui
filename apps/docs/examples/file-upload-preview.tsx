"use client";

import { useState } from "react";

import { FileUpload } from "@/components/fabric-ui/file-upload";

const Example = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload
      multiple
      preview
      accept="image/*,video/*"
      description="Images and videos will show a preview after selection."
      itemClassName="bg-muted/30"
      label="Media"
      listClassName="grid-cols-2"
      value={files}
      onChange={setFiles}
    />
  );
};

export default Example;
