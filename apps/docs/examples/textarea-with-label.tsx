"use client";

import { useState } from "react";
import { Textarea } from "@/components/fabric-ui/textarea";

const Example = () => {
  const [value, setValue] = useState("");

  return (
    <Textarea
      description="Please provide detailed feedback about your experience"
      label="Feedback"
      placeholder="Tell us what you think..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Example;
