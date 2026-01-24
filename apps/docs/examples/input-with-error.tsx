import { Input } from "@/components/fabric-ui/input";

const Example = () => (
  <Input
    error="Password must be at least 8 characters"
    label="Password"
    placeholder="Enter your password"
    type="password"
  />
);

export default Example;
