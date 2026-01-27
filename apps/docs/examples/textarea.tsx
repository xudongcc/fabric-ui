"use client";

import { useState } from "react";
import { Textarea } from "@/components/fabric-ui/textarea";

const Example = () => {
  const [value, setValue] = useState("");

  return (
    <Textarea
      label="Message"
      placeholder="Enter your message"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Example;
