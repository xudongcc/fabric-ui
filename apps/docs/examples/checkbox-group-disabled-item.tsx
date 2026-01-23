import { CheckboxGroup } from "@/components/fabric-ui/checkbox-group";

const Example = () => (
  <CheckboxGroup
    defaultValue={["read"]}
    label="Permissions"
    items={[
      { value: "read", label: "Read", description: "View files and folders" },
      {
        value: "write",
        label: "Write",
        description: "Edit files and folders",
        disabled: true,
      },
      {
        value: "delete",
        label: "Delete",
        description: "Remove files and folders",
      },
    ]}
  />
);

export default Example;
