import { RadioGroup } from "@/components/fabric-ui/radio-group";

const Example = () => (
  <RadioGroup
    defaultValue="free"
    label="Plan"
    items={[
      { value: "free", label: "Free", description: "Basic features" },
      {
        value: "pro",
        label: "Pro",
        description: "Advanced features",
        disabled: true,
      },
      { value: "enterprise", label: "Enterprise", description: "Full access" },
    ]}
  />
);

export default Example;
