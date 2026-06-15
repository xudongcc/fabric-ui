"use client";

import { Page } from "@/components/fabric-ui/page";

const Example = () => (
  <Page
    backAction={{ onClick: () => window.history.back() }}
    description="Review and update the product details."
    primaryAction={{ label: "Save changes" }}
    title="Product details"
  >
    <p className="text-muted-foreground">Your page content goes here.</p>
  </Page>
);

export default Example;
