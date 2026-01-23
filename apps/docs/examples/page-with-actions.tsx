import { Page } from "@repo/page";

const Example = () => (
  <Page
    description="Manage your products and inventory."
    title="Products"
    primaryAction={{
      content: "Add product",
      onAction: () => console.log("Add product"),
    }}
    secondaryActions={[
      {
        key: "export",
        content: "Export",
        onAction: () => console.log("Export"),
      },
      {
        key: "import",
        content: "Import",
        onAction: () => console.log("Import"),
      },
    ]}
  >
    <p className="text-muted-foreground">Your page content goes here.</p>
  </Page>
);

export default Example;
