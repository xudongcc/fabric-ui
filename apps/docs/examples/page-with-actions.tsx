import { Page } from "@/components/fabric-ui/page";

const Example = () => (
  <Page
    description="Manage your products and inventory."
    primaryAction={{ content: "Add product" }}
    title="Products"
    secondaryActions={[
      { key: "export", content: "Export" },
      { key: "import", content: "Import" },
    ]}
  >
    <p className="text-muted-foreground">Your page content goes here.</p>
  </Page>
);

export default Example;
