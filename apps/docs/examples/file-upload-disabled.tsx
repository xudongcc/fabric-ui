import { FileUpload } from "@/components/fabric-ui/file-upload";

const Example = () => (
  <FileUpload
    disabled
    description="Uploads are unavailable while this form is locked."
    label="Attachments"
  />
);

export default Example;
