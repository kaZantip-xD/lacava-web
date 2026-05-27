import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  search: {
    collections: ["menuCategory"],
    maxDepth: 3,
  } as any,
  schema: {
    collections: [
      {
        name: "menuCategory",
        label: "Menu Categories",
        path: "content/categories",
        fields: [
          {
            type: "string",
            name: "locale",
            label: "Language",
            options: ["en", "ua"],
            required: true,
            description: "Create separate entries for each language (EN = English, UA = Ukrainian)",
          },
          {
            type: "string",
            name: "title",
            label: "Category Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "icon",
            label: "Icon",
            description: "Options: Utensils, Coffee, Wine, Beer, CupSoda, Apple, Sandwich, IceCream",
          },
          {
            type: "number",
            name: "order",
            label: "Display Order",
          },
          {
            type: "object",
            name: "items",
            label: "Menu Items",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name || "New Item",
              }),
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Name",
                isTitle: true,
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description / Ingredients",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "price",
                label: "Price",
              },
              {
                type: "image",
                name: "image",
                label: "Image",
              },
            ],
          },
        ],
      },
    ],
  },
});