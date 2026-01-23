import { CheckboxGroup } from "@/components/fabric-ui/checkbox-group";

const Example = () => (
  <CheckboxGroup
    defaultValue={["email"]}
    description="Select the notifications you want to receive."
    label="Notifications"
    items={[
      {
        value: "email",
        label: "Email notifications",
        description: "Receive notifications via email.",
      },
      {
        value: "sms",
        label: "SMS notifications",
        description: "Receive notifications via SMS.",
      },
      {
        value: "push",
        label: "Push notifications",
        description: "Receive push notifications on your device.",
      },
    ]}
  />
);

export default Example;
