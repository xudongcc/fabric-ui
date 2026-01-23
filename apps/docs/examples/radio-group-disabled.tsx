import { RadioGroup } from "@/components/fabric-ui/radio-group";

const Example = () => (
  <RadioGroup
    disabled
    defaultValue="option1"
    label="Disabled Group"
    items={[
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ]}
  />
);

export default Example;
