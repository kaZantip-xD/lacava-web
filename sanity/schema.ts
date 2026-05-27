import { defineType, defineField } from "sanity";
import { IconPicker } from "../sanity/components/IconPicker";

const menuCategory = defineType({
  name: "menuCategory",
  title: "Menu Categories",
  type: "document",
  fields: [
    defineField({
      name: "locale",
      title: "Language",
      type: "string",
      options: { list: ["en", "ua"] },
      initialValue: "en",
    }),
    defineField({
      name: "title",
      title: "Category Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      components: { input: IconPicker },
    }),
    defineField({
      name: "showOnPreviewEnabled",
      title: "Enable preview checkbox for items",
      type: "boolean",
      initialValue: false,
      description: "When enabled, each item in this category gets a checkbox to appear on Coffee/Cocktails preview pages",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
    defineField({
      name: "items",
      title: "Menu Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "item",
          title: "Item",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "description", title: "Description / Ingredients", type: "text" },
            { name: "price", title: "Price", type: "string" },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { accept: "image/*" },
              fields: [
                {
                  name: "imageUrl",
                  title: "Or paste external image URL",
                  type: "string",
                  description: "Paste an image URL (e.g. Unsplash) — shown as fallback when no file is uploaded",
                },
              ],
            },
            {
              name: "showOnPreview",
              title: "Show on preview page",
              type: "boolean",
              initialValue: false,
              hidden: ({ document }) => !document?.showOnPreviewEnabled,
            },
          ],
          preview: {
            select: { title: "name", subtitle: "price" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "locale" },
  },
});

export const schemaTypes = [menuCategory];