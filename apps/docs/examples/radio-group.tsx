import { RadioGroup } from "@/components/fabric-ui/radio-group";

const Example = () => (
  <RadioGroup
    defaultValue="email"
    description="Select your preferred notification method."
    label="Notification Method"
    items={[
      { value: "email", label: "Email" },
      { value: "sms", label: "SMS" },
      { value: "push", label: "Push notification" },
    ]}
  />
);

export default Example;
