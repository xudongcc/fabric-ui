"use client";

import { useState } from "react";
import { Textarea } from "@/components/fabric-ui/textarea";

const Example = () => {
  const [value, setValue] = useState("");

  return (
    <Textarea
      error="Bio must be at least 50 characters"
      label="Bio"
      placeholder="Write a short bio..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Example;
