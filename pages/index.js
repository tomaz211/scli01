import React, { useState } from "react";
import { Heading, Page, EmptyState, Layout } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";
import ProductList from "../components/ProductList";

const Index = () => {
  const [modael, setmodael] = useState({ open: false });
  const emptyState = !store.get("ids");

  function handleSelection(resources) {
    const idsFromResources = resources.selection.map((product) => product.id);
    console.log(idsFromResources);
    setmodael({ open: false });
    store.set("ids", idsFromResources);
  }

  return (
    <Page>
      <ResourcePicker
        resourceType="Product"
        showVariants={true}
        open={modael.open}
        onCancel={() => setmodael({ open: false })}
        onSelection={(resources) => handleSelection(resources)}
      />
      <Layout>
        {emptyState ? (
          <EmptyState
            heading="Customize The product Details Page"
            action={{
              content: "Select a Product",
              onAction: () => setmodael({ open: true }),
            }}
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
          >
            <p>Select the product to customize its page.</p>
          </EmptyState>
        ) : (
          <ProductList />
        )}
      </Layout>
    </Page>
  );
};

export default Index;
