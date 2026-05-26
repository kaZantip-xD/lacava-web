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
        ],
      },
      {
        name: "menuItem",
        label: "Menu Items",
        path: "content/menu",
        fields: [
          {
            type: "string",
            name: "locale",
            label: "Language",
            options: ["en", "ua"],
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "price",
            label: "Price",
          },
          {
            type: "reference",
            name: "category",
            label: "Category",
            collections: ["menuCategory"],
          },
          {
            type: "image",
            name: "image",
            label: "Image",
          },
          {
            type: "number",
            name: "order",
            label: "Order (for sorting)",
          },
        ],
      },
      {
        name: "pageContent",
        label: "Page Content",
        path: "content/pages",
        format: "json",
        fields: [
          {
            type: "string",
            name: "locale",
            label: "Language",
            options: ["en", "ua"],
            required: true,
          },
          {
            type: "string",
            name: "pageId",
            label: "Page",
            options: ["home", "about", "contact"],
            required: true,
          },
          {
            type: "string",
            name: "heroTitle",
            label: "Hero Title",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "heroSubtitle",
            label: "Hero Subtitle",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "address",
            label: "Address",
          },
          {
            type: "string",
            name: "phone",
            label: "Phone",
          },
          {
            type: "string",
            name: "email",
            label: "Email",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body Content",
            isBody: true,
          },
        ],
      },
    ],
  },
});