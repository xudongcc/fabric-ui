import { Page } from "@/components/fabric-ui/page";

const Example = () => (
  <Page
    description="Manage your products and inventory."
    primaryAction={{ label: "Add product" }}
    secondaryActions={[{ label: "Export" }, { label: "Import" }]}
    title="Products"
  >
    <p className="text-muted-foreground">Your page content goes here.</p>
  </Page>
);

export default Example;
