import { Page } from "@shopify/polaris";
import { Card, EmptyState } from "@shopify/polaris";
import { useRouter } from "next/router";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "../api";

const Index = () => {
  const [file, setFile] = React.useState(null);
  const [currentlyUploading, setCurrentlyUploading] = React.useState(false);
  const fileInput = React.createRef();
  const router = useRouter();

  const uploadFile = async () => {
    setCurrentlyUploading(true);
    try {
      const form = new FormData();
      form.append("file", file, file.name);
      const { data } = await axios.post("/upload/sample", form);
      router.push({
        pathname: "/mapping",
        query: { headers: data.headers },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setCurrentlyUploading(false);
    }
  };

  const chooseFile = () => {
    fileInput.current.click();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Page fullWidth>
      <Card sectioned>
        <EmptyState
          heading="Upload Sample Data"
          action={{
            content: "Choose file",
            onAction: chooseFile,
          }}
          secondaryAction={{
            content: "Upload file",
            onAction: uploadFile,
            disabled: !file,
            loading: currentlyUploading,
          }}
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
          <p>Upload an excel or csv file with headers to continue</p>
          {file && <p>File name: {file.name}</p>}
          <input
            ref={fileInput}
            style={{ display: "none" }}
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
        </EmptyState>
      </Card>
    </Page>
  );
};

export default Index;
