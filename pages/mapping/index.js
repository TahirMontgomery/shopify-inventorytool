import React from "react";
import {
  Card,
  FormLayout,
  Layout,
  Page,
  Select,
  Stack,
  Subheading,
} from "@shopify/polaris";
import { useRouter } from "next/router";

const requiredFields = [
  {
    name: "Title",
    key: "title",
  },
];

const optionalFields = [
  {
    name: "Body HTML",
    key: "body_html",
  },
  {
    name: "Product Type",
    key: "product_type",
  },
  {
    name: "Published Scope",
    key: "published_scope",
  },
  {
    name: "Status",
    key: "status",
  },
  {
    name: "Tags",
    key: "tags",
  },
  {
    name: "Vendor",
    key: "vendor",
  },
];

const Mapping = () => {
  const [mappings, setMappings] = React.useState({});
  const router = useRouter();
  const { headers } = router.query;

  const handleMappingChange = (selected, id, key) => {
    setMappings({ ...mappings, [key]: selected });
  };

  return (
    <Page title="Heading Mappers">
      <Card title="Match file headers to Shopify product fields" sectioned>
        <Card.Section title="Required Fields">
          <div
            style={{
              marginTop: "10px",
            }}
          >
            {requiredFields.map((field, index) => {
              return (
                <div
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <Select
                    label={field.name}
                    options={["none", ...headers]}
                    onChange={(...args) =>
                      handleMappingChange(...args, field.key)
                    }
                    value={mappings[field.key] || "none"}
                  />
                </div>
              );
            })}
          </div>
        </Card.Section>

        <Card.Section title="Optional Fields">
          <div
            style={{
              marginTop: "10px",
            }}
          >
            {optionalFields.map((field, index) => {
              return (
                <div
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <Select
                    label={field.name}
                    options={["none", ...headers]}
                    onChange={(...args) =>
                      handleMappingChange(...args, field.key)
                    }
                    value={mappings[field.key] || "none"}
                  />
                </div>
              );
            })}
          </div>
        </Card.Section>
      </Card>
    </Page>
  );
};

export default Mapping;
